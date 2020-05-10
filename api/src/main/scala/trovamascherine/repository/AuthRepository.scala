package trovamascherine.repository

import java.util.UUID

import scala.concurrent.{ExecutionContext, Future}

import trovamascherine.error.Recoverable
import trovamascherine.persistence.db.Tables._
import trovamascherine.persistence.db.Tables.profile.api._
import trovamascherine.model._

trait AuthRepository {
  def getSupplierId(token: String): Future[Either[String, Option[UUID]]]
  def updateTokens(
    updatedSuppliers: List[SupplierTokenUpdate],
  ): Future[Either[String, Option[Int]]]
}

object AuthRepository extends Recoverable {
  def create(
    db: Database,
  )(implicit ec: ExecutionContext): AuthRepository =
    new AuthRepository {
      override def getSupplierId(
        token: String,
      ): Future[Either[String, Option[UUID]]] = recoverToEither {
        db.run(
          SupplierToken
            .filter(_.token === token)
            .map(_.supplierId)
            .result
            .headOption,
        )
      }

      override def updateTokens(
        updatedSuppliers: List[SupplierTokenUpdate],
      ): Future[Either[String, Option[Int]]] = recoverToEither {
        val action = for {
          _ <- SupplierToken
            .filter(_.supplierId.inSetBind(updatedSuppliers.map(_.supplierId)))
            .delete
          updates <- SupplierToken ++= updatedSuppliers.map(s =>
            SupplierTokenRow(s.supplierId, s.token),
          )
        } yield updates
        db.run(action.transactionally)
      }
    }
}
