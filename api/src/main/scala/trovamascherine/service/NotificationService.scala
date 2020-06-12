package trovamascherine.service

import java.time.LocalDate
import java.time.format.DateTimeFormatter

import scala.concurrent.ExecutionContext

import org.apache.logging.log4j.scala.Logging
import zio.{IO, UIO}
import cats.implicits._
import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import mailo.{DeliveryGuarantee, Mail}
import mailo.data.S3MailData
import mailo.http.MailgunClient

import trovamascherine.error.Error
import trovamascherine.config.NotificationsConfig
import trovamascherine.model._
import trovamascherine.repository.SupplierRepository
import trovamascherine.{Attachments, HashModule}

trait NotificationService {
  def sendWelcomeEmails(): IO[Error, Unit]
  def sendEmails(): IO[Error, Unit]
  def resetTokenAndSendEmails(): IO[Error, Unit]
}

class NotificationServiceImpl(
  supplierRepo: SupplierRepository,
  authService: AuthService,
  config: NotificationsConfig,
)(implicit ec: ExecutionContext, ac: ActorSystem, am: ActorMaterializer)
    extends NotificationService
    with HashModule
    with Logging {
  val attachments = new Attachments(config)
  val mailer = mailo.Mailo(
    new S3MailData,
    new MailgunClient,
    DeliveryGuarantee.AtMostOnce,
  )

  private def enqueueEmails(
    suppliersToEmail: List[EmailSupplier],
  ) = {
    IO.collectAll(suppliersToEmail.collect { case (supplier) => enqueueEmail(supplier) })
  }

  private def subjectWithNameAndDate(supplier: EmailSupplier, subject: String) = {
    val currentDate = LocalDate
      .now()
      .format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
    s"${supplier.name}${subject} $currentDate"
  }

  private[this] def enqueueEmail(
    supplier: EmailSupplier,
  ): UIO[Either[Error, Email]] =
    IO.fromFuture { _ =>
      mailer.send(
        Mail(
          to = supplier.email,
          from = config.from,
          subject = subjectWithNameAndDate(supplier, config.subject),
          templateName = "mail.html",
          params = Map(
            "url" -> s"${config.updateBaseUrl}${supplier.token}",
            "supplier_name" -> supplier.name,
            "supplier_address" -> s"${supplier.address} - ${supplier.city}",
          ),
        ),
      )
    }.map(_.bimap(Error.fromMailoError, _ => Email(supplier.email))).orDie

  private[this] def sendWelcomeEmail(
    supplier: SupplierData,
  ): UIO[Either[Error, Email]] =
    IO.fromFuture { _ =>
      mailer.send(
        Mail(
          to = supplier.email,
          from = config.from,
          subject = "Conferma iscrizione farmacia al portale TrovaMascherine",
          templateName = "welcome.html",
          params = Map(
            "link" -> s"${config.baseUrl}?latitude=${supplier.latitude}&longitude=${supplier.longitude}&zoom=17&supplier=${supplier.id}",
          ),
          attachments = List(attachments.welcome),
        ),
      )
    }.map(_.bimap(Error.fromMailoError, _ => Email(supplier.email))).orDie

  private[this] def sendWelcomeEmailsHelper(
    suppliers: List[SupplierData],
  ): UIO[List[Either[Error, Email]]] = UIO.collectAll(suppliers.map(s => sendWelcomeEmail(s)))

  def sendWelcomeEmails(): IO[Error, Unit] = {
    val limit = 100
    for {
      suppliers <- supplierRepo.listWelcomeEmailNotSent(limit)
      _ = logger.info(s"sending ${suppliers.length} welcome emails")
      sentEmails <- sendWelcomeEmailsHelper(suppliers).map { emailsResult =>
        val (lefts, rights) = emailsResult.separate
        logger.error(s"failed to send following welcome emails ${lefts.toString}")
        rights
      }
      _ <- supplierRepo.setWelcomeEmailsSent(sentEmails)
    } yield ()
  }

  override def sendEmails(): IO[Error, Unit] =
    for {
      suppliersToEmail <- supplierRepo.listEnabledWithToken()
      _ <- enqueueEmails(suppliersToEmail)
    } yield ()

  override def resetTokenAndSendEmails(): IO[Error, Unit] = {
    for {
      _ <- authService.resetTokens()
      result <- sendEmails()
    } yield result
  }
}
