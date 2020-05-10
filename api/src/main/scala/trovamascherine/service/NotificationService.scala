package trovamascherine
package service

import java.time.LocalDate
import java.time.format.DateTimeFormatter

import scala.concurrent.{ExecutionContext, Future}

import cats.instances.future._
import cats.instances.list._
import cats.instances.either._
import cats.syntax.traverse._
import cats.syntax.either._
import cats.data.EitherT

import akka.actor.ActorSystem
import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import mailo.{DeliveryGuarantee, Mail}
import mailo.data.S3MailData
import mailo.http.MailgunClient

import trovamascherine.config.NotificationsConfig
import trovamascherine.model._
import trovamascherine.repository.{AuthRepository, SupplierRepository}

import mailo.{MailError, MailPersistenceError, MailResult, Queued}

import org.apache.logging.log4j.scala.Logging

class NotificationService(
  supplierRepo: SupplierRepository,
  authRepo: AuthRepository,
  config: NotificationsConfig,
)(implicit ec: ExecutionContext, ac: ActorSystem, am: ActorMaterializer)
    extends HashModule
    with Logging {
  val attachments = new Attachments(config)
  val mailer = mailo.Mailo(
    new S3MailData,
    new MailgunClient,
    DeliveryGuarantee.AtMostOnce,
  )

  private[this] def subjectWDate(subject: String) = {
    val currentDate = LocalDate
      .now()
      .format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
    s"${subject} $currentDate"
  }

  private[this] def enqueueEmail(
    email: String,
    token: String,
  ): Future[Either[MailError, MailResult]] =
    mailer.send(
      Mail(
        to = email,
        from = config.from,
        subject = subjectWDate(config.subject),
        templateName = "mail.html",
        params = Map("url" -> s"${config.url}$token"),
      ),
    )

  private[this] def sendWelcomeEmail(
    email: String,
  ): Future[Either[MailError, MailResult]] =
    mailer.send(
      Mail(
        to = email,
        from = config.from,
        subject = "Conferma iscrizione farmacia al portale TrovaMascherine",
        templateName = "welcome.html",
        params = Map.empty,
        attachments = List(attachments.welcome),
      ),
    )

  private[this] def sendWelcomeEmailsHelper(
    emails: List[String],
  ): Future[Either[String, List[String]]] =
    emails
      .foldLeft(
        Future.successful(Nil: List[Either[String, String]]),
      ) { (f, email) =>
        for {
          oldResults <- f
          emailResult <- sendWelcomeEmail(email)
        } yield {
          emailResult.map(_ => email).leftMap(_.message) :: oldResults
        }
      }
      .map(_.sequence)

  def sendWelcomeEmails() = {
    val limit = 100
    for {
      emails <- EitherT(supplierRepo.listWelcomeEmailNotSent(limit))
      _ = logger.info(s"sending ${emails.length} welcome emails")
      sentEmails <- EitherT(sendWelcomeEmailsHelper(emails))
      _ <- EitherT(supplierRepo.setWelcomeEmailsSent(sentEmails))
    } yield ()
  }

  def sendEmails() = {
    EitherT(supplierRepo.listEnabledWithToken()).map { suppliersToEmail =>
      suppliersToEmail.collect {
        case (id, email, Some(token)) => (id, email, token)
      }.foldLeft(
        Future.successful(Right(Queued): Either[MailError, MailResult]),
      ) { (f, record) =>
        f.flatMap { _ =>
          val (_, email, token) = record
          enqueueEmail(email, token)
        }
      }
    }
  }

  def resetTokenAndSendEmails() = {
    for {
      enabledSuppliers <- supplierRepo.listEnabled()
      suppliersToEmail: List[SupplierTokenUpdate] = enabledSuppliers.map(supplier =>
        SupplierTokenUpdate(supplier._1, supplier._2, randomToken),
      )
      _ <- authRepo.updateTokens(suppliersToEmail)
      _ = logger.info(s"about to send ${suppliersToEmail.length} emails")
    } yield suppliersToEmail.foldLeft(
      Future.successful(Right(Queued): Either[MailError, MailResult]),
    ) { (f, supplierTokenUpdate) =>
      f.flatMap { _ =>
        val result = enqueueEmail(supplierTokenUpdate.email, supplierTokenUpdate.token)
        result.collect {
          case Left(MailPersistenceError(message)) => logger.error(message)
        }
        result
      }
    }
  }

  def sendEmailsTo(suppliers: List[(String, String)]) = {
    suppliers.map {
      case (email, token) => enqueueEmail(email, token)
    }
  }
}
