package trovamascherine.repository

import java.sql.Timestamp
import java.time.Instant
import java.util.UUID

import trovamascherine.error.DBError
import trovamascherine.model._
import trovamascherine.persistence.db.Tables.profile.api._
import trovamascherine.persistence.db.Tables.{
  GoodSupplyHistoryRow,
  GoodSupplyHistory => GoodSupplyHistoryTable,
}
import zio.{IO, UIO}

trait HistoryRepository {
  def insert(
    supplierId: UUID,
    data: List[Supply],
  ): UIO[Unit]
}

object HistoryRepository {

  def create(
    db: Database,
  ): HistoryRepository =
    (supplierId: UUID, data: List[Supply]) =>
      IO.fromFuture { _ =>
        db.run(
          GoodSupplyHistoryTable ++=
            data.map { d =>
              GoodSupplyHistoryRow(
                supplierId = supplierId,
                good = Good.caseToString(d.good),
                quantity = d.quantity,
                updatedOn = Timestamp.from(Instant.now),
              )
            },
        )
      }.unit.orDieWith(DBError)
}
