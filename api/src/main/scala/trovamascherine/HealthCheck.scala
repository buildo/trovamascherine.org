package trovamascherine

import scala.concurrent.{ExecutionContext, Future}

import slick.jdbc.JdbcBackend
import slick.driver.PostgresDriver.api._

import trovamascherine.error.Recoverable

trait HealthCheck {
  def healthCheck()(implicit ec: ExecutionContext): Future[Either[String, Unit]]
}

object HealthCheck {
  implicit class HealthCheckedDatabase(db: JdbcBackend#DatabaseDef)
      extends HealthCheck
      with Recoverable {
    def healthCheck()(
      implicit ec: ExecutionContext,
    ): Future[Either[String, Unit]] =
      recoverToEither {
        db.run(sql"select true".as[Boolean]).map(_ => ())
      }
  }
}
