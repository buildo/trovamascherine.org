package trovamascherine.controller

import scala.concurrent.Future

import zio.{Runtime, ZEnv}

import wiro.annotation._

import trovamascherine.HealthCheck
import trovamascherine.error.Error

@path("health")
trait HealthCheckController {

  @query
  def status(): Future[Either[Error, Unit]]
}

class HealthCheckControllerImpl(
  dbhealthcheck: HealthCheck,
)(
  implicit runtime: Runtime[ZEnv],
) extends HealthCheckController
    with IOToFutureEither {

  override def status(): Future[Either[Error, Unit]] =
    dbhealthcheck
      .healthCheck()
      .toFutureEitherCatchAllDefects
}
