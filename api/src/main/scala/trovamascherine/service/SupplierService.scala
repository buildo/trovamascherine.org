package trovamascherine.service

import java.util.UUID

import scala.concurrent.{ExecutionContext, Future}

import cats.data.EitherT
import cats.instances.future._

import trovamascherine.repository._
import trovamascherine.model._

trait SupplierService {
  def list(): Future[Either[String, List[Supplier]]]
  def listInBoundingBox(
    minLongitude: Double,
    minLatitude: Double,
    maxLongitude: Double,
    maxLatitude: Double,
  ): Future[Either[String, List[Supplier]]]
  def read(
    supplierId: UUID,
  ): Future[Either[String, Option[Supplier]]]
  def readByToken(
    token: String,
  ): Future[Either[String, Option[Supplier]]]
  def update(
    token: String,
    data: List[Supply],
  ): Future[Either[String, Unit]]
  def updateConfig(
    token: String,
    data: SupplierConfig,
  ): Future[Either[String, Unit]]
  def updateData(
    token: String,
    data: SupplierDataUpdate,
  ): Future[Either[String, Unit]]
  def acceptTerms(token: String): Future[Either[String, Unit]]
}

object SupplierService {
  def create(
    authRepo: AuthRepository,
    supplierRepo: SupplierRepository,
    historyRepo: HistoryRepository,
  )(implicit ec: ExecutionContext): SupplierService =
    new SupplierService {
      override def list(): Future[Either[String, List[Supplier]]] =
        supplierRepo.list()

      override def listInBoundingBox(
        minLongitude: Double,
        minLatitude: Double,
        maxLongitude: Double,
        maxLatitude: Double,
      ): Future[Either[String, List[Supplier]]] =
        supplierRepo.listInBoundingBox(minLongitude, minLatitude, maxLongitude, maxLatitude)

      override def read(
        supplierId: UUID,
      ): Future[Either[String, Option[Supplier]]] =
        supplierRepo.read(supplierId)

      override def readByToken(
        token: String,
      ): Future[Either[String, Option[Supplier]]] = {
        (for {
          maybeSupplierId <- EitherT(
            authRepo.getSupplierId(token),
          )
          supplierId <- EitherT.fromEither(
            maybeSupplierId.toRight(
              "Invalid token",
            ),
          )
          data <- EitherT(supplierRepo.read(supplierId))
        } yield data).value
      }

      private def checkNoDuplicateSupplies(
        supplies: List[Supply],
      ): EitherT[Future, String, Unit] = {
        val goods = supplies.map(_.good)
        if (goods.distinct.length == goods.length)
          EitherT.rightT(())
        else
          EitherT.leftT("Duplicate goods found in supplies")
      }

      private def validateUpdate(token: String, data: List[Supply]): Future[Either[String, UUID]] =
        (for {
          _ <- checkNoDuplicateSupplies(data)
          maybeSupplierId <- EitherT(
            authRepo.getSupplierId(token),
          )
          supplierId <- EitherT.fromEither(
            maybeSupplierId.toRight(
              "Invalid token",
            ),
          )
          supplier <- EitherT(supplierRepo.read(supplierId))
          _ <- EitherT.fromEither(
            supplier
              .flatMap(_.data.termsAcceptedOn)
              .toRight("Terms and conditions not accepted"),
          )
          _ <- EitherT.fromEither(
            supplier
              .flatMap(_.data.privacyPolicyAcceptedOn)
              .toRight("Privacy policy not accepted"),
          )
        } yield supplierId).value

      private def insertData(supplierId: UUID, data: List[Supply]): Future[Either[String, Unit]] = {
        historyRepo.insert(supplierId, data)
        supplierRepo.update(supplierId, data)
      }

      override def update(
        token: String,
        data: List[Supply],
      ): Future[Either[String, Unit]] = {
        (for {
          supplierId <- EitherT(validateUpdate(token, data))
          result <- EitherT(insertData(supplierId, data))
        } yield result).value
      }

      override def updateConfig(
        token: String,
        data: SupplierConfig,
      ): Future[Either[String, Unit]] = {
        (for {
          maybeSupplierId <- EitherT(
            authRepo.getSupplierId(token),
          )
          supplierId <- EitherT.fromOption(maybeSupplierId, "Invalid token")
          result <- EitherT(supplierRepo.updateConfig(supplierId, data))
        } yield result).value
      }

      override def updateData(
        token: String,
        data: SupplierDataUpdate,
      ): Future[Either[String, Unit]] = {
        (for {
          maybeSupplierId <- EitherT(
            authRepo.getSupplierId(token),
          )
          supplierId <- EitherT.fromOption(maybeSupplierId, "Invalid token")
          result <- EitherT(supplierRepo.updateData(supplierId, data))
        } yield result).value
      }

      override def acceptTerms(token: String): Future[Either[String, Unit]] = {
        (for {
          maybeSupplierId <- EitherT(
            authRepo.getSupplierId(token),
          )
          supplierId <- EitherT.fromEither(
            maybeSupplierId.toRight(
              "Invalid token",
            ),
          )
          _ <- EitherT(supplierRepo.acceptTerms(supplierId))
        } yield ()).value
      }

    }
}
