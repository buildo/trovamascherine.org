package trovamascherine.repository

import java.util.UUID
import java.time.Instant
import java.sql.Timestamp

import zio.{IO, UIO}
import trovamascherine.error.{DBError, Error}
import trovamascherine.persistence.db.Tables.{
  GoodSupply => GoodSupplyTable,
  Supplier => SupplierTable,
  SupplierToken => SupplierTokenTable,
}
import trovamascherine.persistence.db.Tables.{GoodSupplyRow, SupplierRow, SupplierTokenRow}
import trovamascherine.persistence.db.Tables.profile.api._
import trovamascherine.model._

trait SupplierRepository {
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
  def update(
    supplierId: UUID,
    data: List[Supply],
  ): IO[Error, Unit]
  def updateConfig(
    supplierId: UUID,
    data: SupplierConfig,
  ): IO[Error, Unit]
  def updateData(
    supplierId: UUID,
    data: SupplierDataUpdate,
  ): IO[Error, Unit]
  def listEnabled(): IO[Error, List[(UUID, String)]]
  def listEnabledWithToken(): IO[Error, List[EmailSupplier]]
  def acceptTerms(supplierId: UUID): IO[Error, Unit]
  def listWelcomeEmailNotSent(limit: Int): IO[Error, List[SupplierData]]
  def setWelcomeEmailsSent(emails: List[Email]): IO[Error, Unit]
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

object SupplierRepository {
  import SupplierConverters._

  def create(
    db: Database,
  ): SupplierRepository =
    new SupplierRepository {
      override def list(): UIO[List[Supplier]] =
        IO.fromFuture { _ =>
          db.run(
            (SupplierTable
              .filter(_.enabled)
              .joinLeft(GoodSupplyTable)
              .on(_.id === _.supplierId))
              .result,
          )
        }.map(convertSupplierList).orDieWith(DBError)

      override def listInBoundingBox(
        minLongitude: Double,
        minLatitude: Double,
        maxLongitude: Double,
        maxLatitude: Double,
      ): IO[Error, List[Supplier]] =
        IO.fromFuture { _ =>
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
        }.map(convertSupplierList).orDieWith(DBError)

      override def read(
        supplierId: UUID,
      ): UIO[Option[Supplier]] =
        IO.fromFuture { _ =>
          db.run(
            (SupplierTable
              .filter(_.id === supplierId)
              .joinLeft(GoodSupplyTable)
              .on(_.id === _.supplierId))
              .result,
          )
        }.map(convertSupplier).orDieWith(DBError)

      override def update(
        supplierId: UUID,
        data: List[Supply],
      ): UIO[Unit] =
        IO.fromFuture { implicit ec =>
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
        }.orDieWith(DBError)

      override def updateConfig(
        supplierId: UUID,
        data: SupplierConfig,
      ): UIO[Unit] =
        IO.fromFuture { implicit ec =>
          {
            val updateQuery =
              SupplierTable
                .filter(_.id === supplierId)
                .map(_.showPhone)
                .update(data.showPhoneNumber)

            db.run(updateQuery.transactionally).map(_ => ())
          }
        }.orDieWith(DBError)

      override def updateData(
        supplierId: UUID,
        data: SupplierDataUpdate,
      ): UIO[Unit] =
        IO.fromFuture { implicit ec =>
          {
            val updateQuery =
              SupplierTable
                .filter(_.id === supplierId)
                .map(_.referencephone)
                .update(data.phoneNumber)

            db.run(updateQuery.transactionally).map(_ => ())
          }
        }.orDieWith(DBError)

      override def listEnabled(): UIO[List[(UUID, String)]] =
        IO.fromFuture { _ =>
          db.run(
            SupplierTable.filter(_.enabled === true).map(s => (s.id, s.email)).result,
          )
        }.map(_.toList).orDieWith(DBError)

      override def listEnabledWithToken(): UIO[List[EmailSupplier]] =
        IO.fromFuture { _ =>
          db.run(
            SupplierTable
              .filter(_.enabled === true)
              .joinLeft(SupplierTokenTable)
              .on(_.id === _.supplierId)
              .result,
          )
        }.map(convertEmailSupplier).orDieWith(DBError)

      override def acceptTerms(supplierId: UUID): UIO[Unit] =
        IO.fromFuture { implicit ec =>
          val nowTimestamp = Timestamp.from(Instant.now())
          db.run(
            SupplierTable
              .filter(_.id === supplierId)
              .map(s => (s.termsAcceptedOn, s.privacyPolicyAcceptedOn))
              .update((Some(nowTimestamp), Some(nowTimestamp)))
              .map(_ => ()),
          )
        }.orDieWith(DBError)

      override def listWelcomeEmailNotSent(limit: Int): UIO[List[SupplierData]] =
        IO.fromFuture { _ =>
          db.run(
            SupplierTable
              .filter(s => s.enabled === true && s.welcomeEmailSent === false)
              .take(limit)
              .result,
          )
        }.map(convertSupplierDataList).orDieWith(DBError)

      override def setWelcomeEmailsSent(emails: List[Email]): UIO[Unit] =
        IO.fromFuture { implicit ec =>
          val textEmails = emails.map(_.value)
          db.run(
            SupplierTable
              .filter(_.email.inSetBind(textEmails))
              .map(_.welcomeEmailSent)
              .update(true)
              .map(_ => ()),
          )
        }.orDieWith(DBError)
    }
}
