package trovamascherine.controller

import scala.concurrent.{ExecutionContext, Future}

import wiro.annotation._

import trovamascherine.HealthCheck
import trovamascherine.error.ApiError

@path("health")
trait HealthCheckController {

  @query
  def status(): Future[Either[ApiError, Unit]]

}

class HealthCheckControllerImpl(
  dbhealthcheck: HealthCheck,
)(
  implicit
  executionContext: ExecutionContext,
) extends HealthCheckController {

  override def status(): Future[Either[ApiError, Unit]] =
    dbhealthcheck
      .healthCheck()
      .map(ApiError.toFatal)

}
