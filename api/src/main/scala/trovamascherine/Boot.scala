package trovamascherine

import java.util.TimeZone

import scala.concurrent.ExecutionContext

import zio.Runtime
import org.apache.logging.log4j.scala.Logging
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
import trovamascherine.model.NotificationFrequency

object Boot
    extends RouterDerivationModule
    with WiroErrorResponses
    with SerializerModule
    with FlywayMigrations {

  def main(args: Array[String]): Unit = {
    implicit val system: ActorSystem = ActorSystem("trovamascherine")
    implicit val materializer: ActorMaterializer = ActorMaterializer()
    implicit val ec: ExecutionContext = system.dispatcher
    implicit val runtime = Runtime.default
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
    implicit val runtime = Runtime.default

    val config = pureconfig.loadConfigOrThrow[Config]

    runMigrations(args, config.db)

    logger.info(
      s"scheduling twice per day morning emails for ${config.notifications.twicePerDayMorningSchedule}",
    )
    logger.info(
      s"scheduling twice per day afternoon emails for ${config.notifications.twicePerDayAfternoonSchedule}",
    )
    logger.info(
      s"scheduling thrice per week emails for ${config.notifications.thricePerWeekSchedule}",
    )
    logger.info(
      s"scheduling once per week emails for ${config.notifications.oncePerWeekSchedule}",
    )
    logger.info(s"scheduling welcome emails for ${config.notifications.welcomeSchedule}")

    val database = Database.forConfig("db")
    val authRepository = AuthRepository.create(database)
    val supplierRepository = SupplierRepository.create(database)
    val authService = AuthService.create(authRepository, supplierRepository)
    val notificationService =
      new NotificationServiceImpl(
        supplierRepository,
        authService,
        config.notifications,
      )

    val twicePerDayMorningEmailsTask = task {
      runtime.unsafeRunSync(
        notificationService.resetTokenAndSendEmails(NotificationFrequency.TwicePerDay),
      )
    }
    twicePerDayMorningEmailsTask.executes(config.notifications.twicePerDayMorningSchedule)

    val twicePerDayAfternoonEmailsTask = task {
      runtime.unsafeRunSync(notificationService.sendEmails(NotificationFrequency.TwicePerDay))
    }
    twicePerDayAfternoonEmailsTask.executes(config.notifications.twicePerDayAfternoonSchedule)

    val thricePerWeekEmailsTask = task {
      runtime.unsafeRunSync(notificationService.sendEmails(NotificationFrequency.ThricePerWeek))
    }
    thricePerWeekEmailsTask.executes(config.notifications.thricePerWeekSchedule)

    val oncePerWeekEmailsTask = task {
      runtime.unsafeRunSync(notificationService.sendEmails(NotificationFrequency.OncePerWeek))
    }
    oncePerWeekEmailsTask.executes(config.notifications.oncePerWeekSchedule)

    val welcomeTask = task { runtime.unsafeRunSync(notificationService.sendWelcomeEmails()) }
    welcomeTask.executes(config.notifications.welcomeSchedule)
    ()
  }
}
