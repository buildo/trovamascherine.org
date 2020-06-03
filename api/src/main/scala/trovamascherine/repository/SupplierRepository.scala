package trovamascherine.repository

import java.util.UUID
import java.time.Instant
import java.sql.Timestamp

import scala.concurrent.{ExecutionContext, Future}

import trovamascherine.error.Recoverable
import trovamascherine.persistence.db.Tables.{
  Supplier => SupplierTable,
  GoodSupply => GoodSupplyTable,
  SupplierToken => SupplierTokenTable,
}
import trovamascherine.persistence.db.Tables.{GoodSupplyRow, SupplierRow, SupplierTokenRow}
import trovamascherine.persistence.db.Tables.profile.api._
import trovamascherine.model._

trait SupplierRepository {
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
  def update(
    supplierId: UUID,
    data: List[Supply],
  ): Future[Either[String, Unit]]
  def updateConfig(
    supplierId: UUID,
    data: SupplierConfig,
  ): Future[Either[String, Unit]]
  def updateData(
    supplierId: UUID,
    data: SupplierDataUpdate,
  ): Future[Either[String, Unit]]
  def listEnabled(): Future[List[(UUID, String)]]
  def listEnabledWithToken(): Future[Either[String, List[EmailSupplier]]]
  def acceptTerms(supplierId: UUID): Future[Either[String, Unit]]
  def listWelcomeEmailNotSent(limit: Int): Future[Either[String, List[SupplierData]]]
  def setWelcomeEmailsSent(emails: List[String]): Future[Either[String, Unit]]
}

object SupplierConverters {
  def convertEmailSupplier(
    rows: Seq[(SupplierRow, Option[SupplierTokenRow])],
  ): List[EmailSupplier] =
    rows.map {
      case (supplier, Some(supplierTokenRow)) =>
        Some(
          EmailSupplier(
            email = supplier.email,
            name = supplier.name,
            address = supplier.address,
            city = supplier.comune,
            token = supplierTokenRow.token,
          ),
        )
      case (_, None) => None
    }.toList.flatten

  def convertSupply(rows: Seq[GoodSupplyRow]): List[Supply] =
    rows.flatMap { row =>
      //Unkown goods are shamlessly discarded
      Good.caseFromString(row.good).map { good =>
        Supply(
          good,
          row.quantity,
        )
      }
    }.toList

  def convertSupplier(
    rows: Seq[(SupplierRow, Option[GoodSupplyRow])],
  ): Option[Supplier] =
    convertSupplierList(rows).headOption

  def convertSupplierList(
    rows: Seq[(SupplierRow, Option[GoodSupplyRow])],
  ): List[Supplier] =
    rows
      .groupBy(_._1)
      .map {
        case (supplier, supplies) =>
          val usableSupplies = supplies.flatMap(_._2)
          val lastUpdatedOn =
            usableSupplies.headOption.map(s => s.lastupdatedon)
          Supplier(
            data = SupplierData(
              id = supplier.id,
              latitude = supplier.coordinates.getCoordinate().y,
              longitude = supplier.coordinates.getCoordinate().x,
              address = supplier.address,
              email = supplier.email,
              cap = supplier.cap,
              city = supplier.comune,
              province = supplier.province,
              name = supplier.name,
              vatNumber = supplier.vatNumber,
              phoneNumber = supplier.referencephone,
              termsAcceptedOn = supplier.termsAcceptedOn.map(_.toInstant),
              privacyPolicyAcceptedOn = supplier.privacyPolicyAcceptedOn.map(_.toInstant),
            ),
            supplies = convertSupply(usableSupplies),
            lastUpdatedOn = lastUpdatedOn.map(_.toInstant),
            config = SupplierConfig(
              showPhoneNumber = supplier.showPhone,
            ),
          )
      }
      .toList

  def convertSupplierDataList(rows: Seq[SupplierRow]): List[SupplierData] =
    rows.map { supplier =>
      SupplierData(
        id = supplier.id,
        latitude = supplier.coordinates.getCoordinate().y,
        longitude = supplier.coordinates.getCoordinate().x,
        address = supplier.address,
        email = supplier.email,
        cap = supplier.cap,
        city = supplier.comune,
        province = supplier.province,
        name = supplier.name,
        vatNumber = supplier.vatNumber,
        phoneNumber = supplier.referencephone,
        termsAcceptedOn = supplier.termsAcceptedOn.map(_.toInstant),
        privacyPolicyAcceptedOn = supplier.privacyPolicyAcceptedOn.map(_.toInstant),
      )
    }.toList
}

object SupplierRepository extends Recoverable {
  import SupplierConverters._

  def create(
    db: Database,
  )(implicit ec: ExecutionContext): SupplierRepository =
    new SupplierRepository {
      override def list(): Future[Either[String, List[Supplier]]] =
        recoverToEither {
          db.run(
              (SupplierTable
                .filter(_.enabled)
                .joinLeft(GoodSupplyTable)
                .on(_.id === _.supplierId))
                .result,
            )
            .map(convertSupplierList)
        }

      override def listInBoundingBox(
        minLongitude: Double,
        minLatitude: Double,
        maxLongitude: Double,
        maxLatitude: Double,
      ): Future[Either[String, List[Supplier]]] = recoverToEither {
        db.run(
            (SupplierTable
              .filter(_.enabled)
              .filter(s =>
                makeEnvelope(minLongitude, minLatitude, maxLongitude, maxLatitude) @> s.coordinates,
              )
              .joinLeft(GoodSupplyTable)
              .on(_.id === _.supplierId))
              .result,
          )
          .map(convertSupplierList)
      }

      override def read(
        supplierId: UUID,
      ): Future[Either[String, Option[Supplier]]] = recoverToEither {
        db.run(
            (SupplierTable
              .filter(_.id === supplierId)
              .joinLeft(GoodSupplyTable)
              .on(_.id === _.supplierId))
              .result,
          )
          .map(convertSupplier)
      }

      override def update(
        supplierId: UUID,
        data: List[Supply],
      ): Future[Either[String, Unit]] = recoverToEither {
        db.run(for {
          _ <- GoodSupplyTable
            .filter(_.supplierId === supplierId)
            .delete
            .andThen {
              GoodSupplyTable ++=
                data.map { d =>
                  GoodSupplyRow(
                    supplierId = supplierId,
                    good = Good.caseToString(d.good),
                    quantity = d.quantity,
                    lastupdatedon = Timestamp.from(Instant.now),
                  )
                }
            }
            .transactionally
        } yield ())
      }

      override def updateConfig(
        supplierId: UUID,
        data: SupplierConfig,
      ): Future[Either[String, Unit]] = recoverToEither {
        val updateQuery =
          SupplierTable.filter(_.id === supplierId).map(_.showPhone).update(data.showPhoneNumber)

        db.run(updateQuery.transactionally).map(_ => ())
      }

      override def updateData(
        supplierId: UUID,
        data: SupplierDataUpdate,
      ): Future[Either[String, Unit]] = recoverToEither {
        val updateQuery =
          SupplierTable.filter(_.id === supplierId).map(_.referencephone).update(data.phoneNumber)

        db.run(updateQuery.transactionally).map(_ => ())
      }

      override def listEnabled(): Future[List[(UUID, String)]] = {
        db.run(
            SupplierTable.filter(_.enabled === true).map(s => (s.id, s.email)).result,
          )
          .map(_.toList)
      }

      override def listEnabledWithToken(): Future[Either[String, List[EmailSupplier]]] =
        recoverToEither {
          db.run(
              SupplierTable
                .filter(_.enabled === true)
                .joinLeft(SupplierTokenTable)
                .on(_.id === _.supplierId)
                .result,
            )
            .map(convertEmailSupplier)
        }

      override def acceptTerms(supplierId: UUID): Future[Either[String, Unit]] = recoverToEither {
        val nowTimestamp = Timestamp.from(Instant.now())
        db.run(
          SupplierTable
            .filter(_.id === supplierId)
            .map(s => (s.termsAcceptedOn, s.privacyPolicyAcceptedOn))
            .update((Some(nowTimestamp), Some(nowTimestamp)))
            .map(_ => ()),
        )
      }

      override def listWelcomeEmailNotSent(limit: Int): Future[Either[String, List[SupplierData]]] =
        recoverToEither {
          db.run(
              SupplierTable
                .filter(s => s.enabled === true && s.welcomeEmailSent === false)
                .take(limit)
                .result,
            )
            .map(convertSupplierDataList)
        }

      override def setWelcomeEmailsSent(emails: List[String]): Future[Either[String, Unit]] =
        recoverToEither {
          db.run(
            SupplierTable
              .filter(_.email.inSetBind(emails))
              .map(_.welcomeEmailSent)
              .update(true)
              .map(_ => ()),
          )
        }
    }
}
