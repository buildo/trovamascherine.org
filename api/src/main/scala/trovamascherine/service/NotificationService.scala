package trovamascherine
package service

import java.time.LocalDate
import java.time.format.DateTimeFormatter

import scala.concurrent.{ExecutionContext, Future}

import org.apache.logging.log4j.scala.Logging
import cats.implicits._
import cats.data.EitherT
import akka.actor.ActorSystem
import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import mailo.{DeliveryGuarantee, Mail}
import mailo.data.S3MailData
import mailo.http.MailgunClient
import mailo.{MailError, MailResult, Queued}

import trovamascherine.config.NotificationsConfig
import trovamascherine.model._
import trovamascherine.repository.SupplierRepository

class NotificationService(
  supplierRepo: SupplierRepository,
  authService: AuthService,
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

  private def enqueueEmails(
    suppliersToEmail: List[EmailSupplier],
  ): Future[Either[String, MailResult]] =
    suppliersToEmail
      .foldLeft(
        Future.successful(Right(Queued): Either[MailError, MailResult]),
      ) { (f, supplier) =>
        f.flatMap { _ =>
          val result = enqueueEmail(supplier)
          result.map(_.leftMap(e => logger.error(s"failed to send email ${e.message}")))
          result
        }
      }
      .map(_.leftMap(e => e.message))

  private def subjectWithNameAndDate(supplier: EmailSupplier, subject: String) = {
    val currentDate = LocalDate
      .now()
      .format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
    s"${supplier.name}${subject} $currentDate"
  }

  private[this] def enqueueEmail(
    supplier: EmailSupplier,
  ): Future[Either[MailError, MailResult]] =
    mailer.send(
      Mail(
        to = supplier.email,
        from = config.from,
        subject = subjectWithNameAndDate(supplier, config.subject),
        templateName = "mail.html",
        params = Map(
          "url" -> s"${config.url}${supplier.token}",
          "supplier_name" -> supplier.name,
          "supplier_address" -> s"${supplier.address} - ${supplier.city}",
        ),
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
  ): Future[List[Either[String, String]]] =
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

  def sendWelcomeEmails(): Future[Either[String, Unit]] = {
    val limit = 100
    (for {
      emails <- EitherT(supplierRepo.listWelcomeEmailNotSent(limit))
      _ = logger.info(s"sending ${emails.length} welcome emails")
      sentEmails <- EitherT.right(sendWelcomeEmailsHelper(emails).map { emailsResult =>
        val (lefts, rights) = emailsResult.separate
        logger.error(s"failed to send following welcome emails ${lefts.toString}")
        rights
      })
      _ <- EitherT(supplierRepo.setWelcomeEmailsSent(sentEmails))
    } yield ()).value
  }

  def sendEmails(): Future[Either[String, MailResult]] =
    (for {
      suppliersToEmail <- EitherT(supplierRepo.listEnabledWithToken())
      result <- EitherT(enqueueEmails(suppliersToEmail)),
    } yield result).value

  def resetTokenAndSendEmails(): Future[Either[String, MailResult]] = {
    for {
      _ <- authService.resetTokens()
      result <- sendEmails()
    } yield result
  }
}
