package trovamascherine.repository

import java.util.UUID
import java.time.Instant
import java.sql.Timestamp

import scala.concurrent.{ExecutionContext, Future}

import trovamascherine.error.Recoverable
import trovamascherine.persistence.db.Tables.{GoodSupplyHistory => GoodSupplyHistoryTable}
import trovamascherine.persistence.db.Tables.GoodSupplyHistoryRow
import trovamascherine.persistence.db.Tables.profile.api._
import trovamascherine.model._

trait HistoryRepository {
  def insert(
    supplierId: UUID,
    data: List[Supply],
  ): Future[Either[String, Unit]]
}

object HistoryRepository extends Recoverable {

  def create(
    db: Database,
  )(implicit ec: ExecutionContext): HistoryRepository =
    new HistoryRepository {
      override def insert(
        supplierId: UUID,
        data: List[Supply],
      ): Future[Either[String, Unit]] = recoverToEither {
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
          .map(_ => ())
      }
    }
}
