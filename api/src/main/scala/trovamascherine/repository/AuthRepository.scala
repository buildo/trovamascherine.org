package trovamascherine.repository

import java.util.UUID

import trovamascherine.error.DBError
import trovamascherine.model._
import trovamascherine.persistence.db.Tables._
import trovamascherine.persistence.db.Tables.profile.api._
import zio.{IO, UIO}

trait AuthRepository {
  def getSupplierId(token: String): UIO[Option[UUID]]
  def updateTokens(
    updatedSuppliers: List[SupplierTokenUpdate],
  ): UIO[Option[Int]]
}

object AuthRepository {
  def create(
    db: Database,
  ): AuthRepository =
    new AuthRepository {
      override def getSupplierId(
        token: String,
      ): UIO[Option[UUID]] =
        IO.fromFuture { _ =>
          db.run(
            SupplierToken
              .filter(_.token === token)
              .map(_.supplierId)
              .result
              .headOption,
          )
        }.orDieWith(DBError)

      override def updateTokens(
        updatedSuppliers: List[SupplierTokenUpdate],
      ): UIO[Option[Int]] =
        IO.fromFuture { implicit ec =>
          val action = for {
            _ <- SupplierToken
              .filter(_.supplierId.inSetBind(updatedSuppliers.map(_.supplierId)))
              .delete
            updates <- SupplierToken ++= updatedSuppliers.map(s =>
              SupplierTokenRow(s.supplierId, s.token),
            )
          } yield updates
          db.run(action.transactionally)
        }.orDieWith(DBError)
    }
}
