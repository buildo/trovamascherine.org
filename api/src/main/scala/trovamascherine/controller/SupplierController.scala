package trovamascherine.controller

import java.util.UUID

import scala.concurrent.Future

import zio.{Runtime, ZEnv}
import wiro.Auth
import wiro.annotation._

import trovamascherine.error.Error
import trovamascherine.model._
import trovamascherine.service._

@path("supplier")
trait SupplierController {

  @query
  def list(): Future[Either[Error, List[FrontOfficeSupplier]]]

  @query
  def listInBoundingBox(
    minLongitude: Double,
    minLatitude: Double,
    maxLongitude: Double,
    maxLatitude: Double,
  ): Future[Either[Error, List[FrontOfficeSupplier]]]

  @query
  def read(supplierId: UUID): Future[Either[Error, FrontOfficeSupplier]]

  @query
  def readByToken(
    token: Auth,
  ): Future[Either[Error, Supplier]]

  @command
  def update(
    token: Auth,
    data: List[Supply],
  ): Future[Either[Error, Unit]]

  @command
  def updateConfig(
    token: Auth,
    data: SupplierConfig,
  ): Future[Either[Error, Unit]]

  @command
  def updateData(
    token: Auth,
    data: SupplierDataUpdate,
  ): Future[Either[Error, Unit]]

  @command
  def acceptTerms(token: Auth): Future[Either[Error, Unit]]
}

class SupplierControllerImpl(service: SupplierService)(
  implicit runtime: Runtime[ZEnv],
) extends SupplierController
    with IOToFutureEither {

  override def list(): Future[Either[Error, List[FrontOfficeSupplier]]] =
    service.list().map(_.map(FrontOfficeSupplier.apply)).toFutureEitherCatchAllDefects

  override def listInBoundingBox(
    minLongitude: Double,
    minLatitude: Double,
    maxLongitude: Double,
    maxLatitude: Double,
  ): Future[Either[Error, List[FrontOfficeSupplier]]] =
    service
      .listInBoundingBox(minLongitude, minLatitude, maxLongitude, maxLatitude)
      .map(_.map(FrontOfficeSupplier.apply))
      .toFutureEitherCatchAllDefects

  override def read(
    supplierId: UUID,
  ): Future[Either[Error, FrontOfficeSupplier]] =
    service
      .read(supplierId)
      .someOrFail(Error.SupplierNotFound(supplierId))
      .map(FrontOfficeSupplier.apply)
      .toFutureEitherCatchAllDefects

  override def readByToken(
    token: Auth,
  ): Future[Either[Error, Supplier]] =
    service
      .readByToken(token.token)
      .someOrFail(Error.TokenNotFound)
      .toFutureEitherCatchAllDefects

  override def update(
    token: Auth,
    data: List[Supply],
  ): Future[Either[Error, Unit]] =
    service.update(token.token, data).toFutureEitherCatchAllDefects

  override def updateConfig(
    token: Auth,
    data: SupplierConfig,
  ): Future[Either[Error, Unit]] =
    service.updateConfig(token.token, data).toFutureEitherCatchAllDefects

  override def updateData(
    token: Auth,
    data: SupplierDataUpdate,
  ): Future[Either[Error, Unit]] =
    service.updateData(token.token, data).toFutureEitherCatchAllDefects

  override def acceptTerms(token: Auth): Future[Either[Error, Unit]] =
    service.acceptTerms(token.token).toFutureEitherCatchAllDefects

}
