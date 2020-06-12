package trovamascherine.service

import java.util.UUID

import zio.{IO, UIO}
import trovamascherine.repository._
import trovamascherine.error.Error
import trovamascherine.repository.{AuthRepository, SupplierRepository}
import trovamascherine.model._

trait SupplierService {
  def list(): IO[Error, List[Supplier]]
  def listInBoundingBox(
    minLongitude: Double,
    minLatitude: Double,
    maxLongitude: Double,
    maxLatitude: Double,
  ): IO[Error, List[Supplier]]
  def read(
    supplierId: UUID,
  ): IO[Error, Option[Supplier]]
  def readByToken(
    token: String,
  ): IO[Error, Option[Supplier]]
  def update(
    token: String,
    data: List[Supply],
  ): IO[Error, Unit]
  def updateConfig(
    token: String,
    data: SupplierConfig,
  ): IO[Error, Unit]
  def updateData(
    token: String,
    data: SupplierDataUpdate,
  ): IO[Error, Unit]
  def acceptTerms(token: String): IO[Error, Unit]
}

object SupplierService {
  def create(
    authRepo: AuthRepository,
    supplierRepo: SupplierRepository,
    historyRepo: HistoryRepository,
  ): SupplierService =
    new SupplierService {
      override def list(): IO[Error, List[Supplier]] =
        supplierRepo.list()

      override def listInBoundingBox(
        minLongitude: Double,
        minLatitude: Double,
        maxLongitude: Double,
        maxLatitude: Double,
      ): IO[Error, List[Supplier]] =
        supplierRepo.listInBoundingBox(minLongitude, minLatitude, maxLongitude, maxLatitude)

      override def read(
        supplierId: UUID,
      ): IO[Error, Option[Supplier]] =
        supplierRepo.read(supplierId)

      private[this] def checkToken(token: String): IO[Error, UUID] =
        authRepo.getSupplierId(token).someOrFail(Error.InvalidToken(token))

      override def readByToken(
        token: String,
      ): IO[Error, Option[Supplier]] =
        for {
          supplierId <- checkToken(token)
          data <- supplierRepo.read(supplierId)
        } yield data

      private def checkNoDuplicateSupplies(
        supplies: List[Supply],
      ): IO[Error, Unit] = {
        val goods = supplies.map(_.good)
        if (goods.distinct.length == goods.length)
          IO.unit
        else
          IO.fail(Error.DuplicateGoodsInSupplies)
      }

      private def validateUpdate(token: String, data: List[Supply]): IO[Error, UUID] =
        for {
          _ <- checkNoDuplicateSupplies(data)
          supplierId <- checkToken(token)
          supplier <- supplierRepo.read(supplierId).someOrFail(Error.SupplierNotFound(supplierId))
          _ <- UIO
            .apply(supplier.data.termsAcceptedOn)
            .someOrFail(Error.TermsNotAccepted(supplierId))
          _ <- UIO
            .apply(supplier.data.privacyPolicyAcceptedOn)
            .someOrFail(Error.PrivacyPolicyNotAccepted(supplierId))
        } yield supplierId

      private def insertData(supplierId: UUID, data: List[Supply]): IO[Error, Unit] = {
        historyRepo.insert(supplierId, data)
        supplierRepo.update(supplierId, data)
      }

      override def update(
        token: String,
        data: List[Supply],
      ): IO[Error, Unit] = {
        for {
          supplierId <- validateUpdate(token, data)
          result <- insertData(supplierId, data)
        } yield result
      }

      override def updateConfig(
        token: String,
        data: SupplierConfig,
      ): IO[Error, Unit] = {
        for {
          supplierId <- checkToken(token)
          result <- supplierRepo.updateConfig(supplierId, data)
        } yield result
      }

      override def updateData(
        token: String,
        data: SupplierDataUpdate,
      ): IO[Error, Unit] = {
        for {
          supplierId <- checkToken(token)
          result <- supplierRepo.updateData(supplierId, data)
        } yield result
      }

      override def acceptTerms(token: String): IO[Error, Unit] =
        for {
          supplierId <- checkToken(token)
          _ <- supplierRepo.acceptTerms(supplierId)
        } yield ()
    }
}
