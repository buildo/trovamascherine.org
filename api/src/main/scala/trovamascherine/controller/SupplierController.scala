package trovamascherine.controller

import scala.concurrent.{ExecutionContext, Future}

import java.util.UUID

import wiro.Auth
import wiro.annotation._

import trovamascherine.error.ApiError
import trovamascherine.model._
import trovamascherine.service._

@path("supplier")
trait SupplierController {

  @query
  def list(): Future[Either[ApiError, List[Supplier]]]

  @query
  def listInBoundingBox(
    minLongitude: Double,
    minLatitude: Double,
    maxLongitude: Double,
    maxLatitude: Double,
  ): Future[Either[ApiError, List[Supplier]]]

  @query
  def read(supplierId: UUID): Future[Either[ApiError, Supplier]]

  @query
  def readByToken(
    token: Auth,
  ): Future[Either[ApiError, Supplier]]

  @command
  def update(
    token: Auth,
    data: List[Supply],
  ): Future[Either[ApiError, Unit]]

  @command
  def acceptTerms(token: Auth): Future[Either[ApiError, Unit]]
}

class SupplierControllerImpl(service: SupplierService)(
  implicit ec: ExecutionContext,
) extends SupplierController {
  override def list(): Future[Either[ApiError, List[Supplier]]] =
    service.list().map(ApiError.toFatal)

  override def listInBoundingBox(
    minLongitude: Double,
    minLatitude: Double,
    maxLongitude: Double,
    maxLatitude: Double,
  ): Future[Either[ApiError, List[Supplier]]] =
    service
      .listInBoundingBox(minLongitude, minLatitude, maxLongitude, maxLatitude)
      .map(ApiError.toFatal)

  override def read(
    supplierId: UUID,
  ): Future[Either[ApiError, Supplier]] =
    service.read(supplierId).map(ApiError.mapErrors)

  override def readByToken(
    token: Auth,
  ): Future[Either[ApiError, Supplier]] =
    service.readByToken(token.token).map(ApiError.mapErrors)

  override def update(
    token: Auth,
    data: List[Supply],
  ): Future[Either[ApiError, Unit]] =
    service.update(token.token, data).map(ApiError.toFatal)

  override def acceptTerms(token: Auth): Future[Either[ApiError, Unit]] =
    service.acceptTerms(token.token).map(ApiError.toFatal)

}
