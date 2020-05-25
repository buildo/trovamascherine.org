package trovamascherine

import scala.concurrent.ExecutionContext

import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import cronish.dsl._
import wiro.server.akkaHttp._
import wiro.server.akkaHttp.FailSupport._

import trovamascherine.repository._
import trovamascherine.service._
import trovamascherine.persistence.db.FlywayMigrations
import trovamascherine.persistence.db.Tables.profile.api.Database
import trovamascherine.config.Config
import trovamascherine.controller._
import trovamascherine.error.WiroErrorResponses

import org.apache.logging.log4j.scala.Logging

import java.util.TimeZone

object Boot
    extends RouterDerivationModule
    with WiroErrorResponses
    with SerializerModule
    with FlywayMigrations {

  def main(args: Array[String]): Unit = {
    implicit val system: ActorSystem = ActorSystem("trovamascherine")
    implicit val materializer: ActorMaterializer = ActorMaterializer()
    implicit val ec: ExecutionContext = system.dispatcher
    val config = pureconfig.loadConfigOrThrow[Config]

    runMigrations(args, config.db)

    val database = Database.forConfig("db")
    val authRepository = AuthRepository.create(database)
    val supplierRepository = SupplierRepository.create(database)
    val historyRepository = HistoryRepository.create(database)
    val supplierService =
      SupplierService.create(authRepository, supplierRepository, historyRepository)
    val supplierController = new SupplierControllerImpl(supplierService)
    val supplierRouter =
      deriveRouter[SupplierController](supplierController)

    val healthCheckRouter = deriveRouter[HealthCheckController](
      new HealthCheckControllerImpl(database),
    )

    new HttpRPCServer(
      config = config.wiro,
      routers = List(supplierRouter, healthCheckRouter),
    )
    ()
  }
}

object NotificationBoot extends FlywayMigrations with Logging {
  def main(args: Array[String]): Unit = {
    TimeZone.setDefault(TimeZone.getTimeZone("Europe/Rome"));

    implicit val system: ActorSystem = ActorSystem("trovamascherine")
    implicit val materializer: ActorMaterializer = ActorMaterializer()
    implicit val ec: ExecutionContext = system.dispatcher
    val config = pureconfig.loadConfigOrThrow[Config]

    runMigrations(args, config.db)

    logger.info(s"scheduled morning emails for ${config.notifications.schedule}")
    logger.info(s"scheduled afternoon emails for ${config.notifications.afternoonSchedule}")
    logger.info(s"scheduled welcome emails for ${config.notifications.welcomeSchedule}")

    val database = Database.forConfig("db")
    val authRepository = AuthRepository.create(database)
    val supplierRepository = SupplierRepository.create(database)
    val authService = AuthService.create(authRepository, supplierRepository)
    val notificationService =
      new NotificationService(
        supplierRepository,
        authService,
        config.notifications,
      )

    val resetTokenAndSendEmailsTask = task { notificationService.resetTokenAndSendEmails() }
    val sendEmailsTask = task { notificationService.sendEmails() }
    val welcomeTask = task { notificationService.sendWelcomeEmails() }

    resetTokenAndSendEmailsTask.executes(config.notifications.schedule)
    sendEmailsTask.executes(config.notifications.afternoonSchedule)
    welcomeTask.executes(config.notifications.welcomeSchedule)
    ()
  }
}
