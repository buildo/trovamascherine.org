package trovamascherine

import slick.driver.PostgresDriver.api._
import slick.jdbc.JdbcBackend
import trovamascherine.error.DBError
import zio.{IO, UIO}

trait HealthCheck {
  def healthCheck(): UIO[Unit]
}

object HealthCheck {
  implicit class HealthCheckedDatabase(db: JdbcBackend#DatabaseDef) extends HealthCheck {
    def healthCheck(): UIO[Unit] =
      IO.fromFuture { _ => db.run(sql"select true".as[Boolean]) }.unit.orDieWith(DBError)
  }
}
