package trovamascherine.persistence.db
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends {
  val profile = trovamascherine.persistence.db.PostgisProfile
} with Tables

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait Tables {
  val profile: trovamascherine.persistence.db.PostgisProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = GoodSupply.schema ++ GoodSupplyHistory.schema ++ Supplier.schema ++ SupplierToken.schema
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table GoodSupply
   *  @param supplierId Database column supplier_id SqlType(uuid)
   *  @param good Database column good SqlType(varchar), Length(255,true)
   *  @param quantity Database column quantity SqlType(int4)
   *  @param lastupdatedon Database column lastupdatedon SqlType(timestamptz) */
  case class GoodSupplyRow(supplierId: java.util.UUID, good: String, quantity: Int, lastupdatedon: java.sql.Timestamp)
  /** GetResult implicit for fetching GoodSupplyRow objects using plain SQL queries */
  implicit def GetResultGoodSupplyRow(implicit e0: GR[java.util.UUID], e1: GR[String], e2: GR[Int], e3: GR[java.sql.Timestamp]): GR[GoodSupplyRow] = GR{
    prs => import prs._
    GoodSupplyRow.tupled((<<[java.util.UUID], <<[String], <<[Int], <<[java.sql.Timestamp]))
  }
  /** Table description of table good_supply. Objects of this class serve as prototypes for rows in queries. */
  class GoodSupply(_tableTag: Tag) extends profile.api.Table[GoodSupplyRow](_tableTag, Some("trovamascherine"), "good_supply") {
    def * = (supplierId, good, quantity, lastupdatedon) <> (GoodSupplyRow.tupled, GoodSupplyRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(supplierId), Rep.Some(good), Rep.Some(quantity), Rep.Some(lastupdatedon)).shaped.<>({r=>import r._; _1.map(_=> GoodSupplyRow.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column supplier_id SqlType(uuid) */
    val supplierId: Rep[java.util.UUID] = column[java.util.UUID]("supplier_id")
    /** Database column good SqlType(varchar), Length(255,true) */
    val good: Rep[String] = column[String]("good", O.Length(255,varying=true))
    /** Database column quantity SqlType(int4) */
    val quantity: Rep[Int] = column[Int]("quantity")
    /** Database column lastupdatedon SqlType(timestamptz) */
    val lastupdatedon: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("lastupdatedon")

    /** Foreign key referencing Supplier (database name supplier_id_foreign_key) */
    lazy val supplierFk = foreignKey("supplier_id_foreign_key", supplierId, Supplier)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table GoodSupply */
  lazy val GoodSupply = new TableQuery(tag => new GoodSupply(tag))

  /** Entity class storing rows of table GoodSupplyHistory
   *  @param supplierId Database column supplier_id SqlType(uuid)
   *  @param good Database column good SqlType(varchar), Length(255,true)
   *  @param quantity Database column quantity SqlType(int4)
   *  @param updatedOn Database column updated_on SqlType(timestamptz) */
  case class GoodSupplyHistoryRow(supplierId: java.util.UUID, good: String, quantity: Int, updatedOn: java.sql.Timestamp)
  /** GetResult implicit for fetching GoodSupplyHistoryRow objects using plain SQL queries */
  implicit def GetResultGoodSupplyHistoryRow(implicit e0: GR[java.util.UUID], e1: GR[String], e2: GR[Int], e3: GR[java.sql.Timestamp]): GR[GoodSupplyHistoryRow] = GR{
    prs => import prs._
    GoodSupplyHistoryRow.tupled((<<[java.util.UUID], <<[String], <<[Int], <<[java.sql.Timestamp]))
  }
  /** Table description of table good_supply_history. Objects of this class serve as prototypes for rows in queries. */
  class GoodSupplyHistory(_tableTag: Tag) extends profile.api.Table[GoodSupplyHistoryRow](_tableTag, Some("trovamascherine"), "good_supply_history") {
    def * = (supplierId, good, quantity, updatedOn) <> (GoodSupplyHistoryRow.tupled, GoodSupplyHistoryRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(supplierId), Rep.Some(good), Rep.Some(quantity), Rep.Some(updatedOn)).shaped.<>({r=>import r._; _1.map(_=> GoodSupplyHistoryRow.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column supplier_id SqlType(uuid) */
    val supplierId: Rep[java.util.UUID] = column[java.util.UUID]("supplier_id")
    /** Database column good SqlType(varchar), Length(255,true) */
    val good: Rep[String] = column[String]("good", O.Length(255,varying=true))
    /** Database column quantity SqlType(int4) */
    val quantity: Rep[Int] = column[Int]("quantity")
    /** Database column updated_on SqlType(timestamptz) */
    val updatedOn: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("updated_on")
  }
  /** Collection-like TableQuery object for table GoodSupplyHistory */
  lazy val GoodSupplyHistory = new TableQuery(tag => new GoodSupplyHistory(tag))

  /** Entity class storing rows of table Supplier
   *  @param id Database column id SqlType(uuid), PrimaryKey
   *  @param email Database column email SqlType(varchar), Length(255,true)
   *  @param cap Database column cap SqlType(varchar), Length(255,true)
   *  @param address Database column address SqlType(varchar), Length(255,true)
   *  @param name Database column name SqlType(varchar), Length(255,true), Default(None)
   *  @param comune Database column comune SqlType(varchar), Length(255,true), Default(None)
   *  @param regione Database column regione SqlType(varchar), Length(255,true), Default(None)
   *  @param referencephone Database column referencephone SqlType(varchar), Length(255,true), Default(None)
   *  @param externalIdCode Database column external_id_code SqlType(int4), Default(None)
   *  @param vatNumber Database column vat_number SqlType(varchar), Length(255,true), Default(None)
   *  @param cityIstatCode Database column city_istat_code SqlType(varchar), Length(255,true), Default(None)
   *  @param province Database column province SqlType(varchar), Length(4,true), Default(None)
   *  @param enabled Database column enabled SqlType(bool), Default(Some(false))
   *  @param termsAcceptedOn Database column terms_accepted_on SqlType(timestamptz), Default(None)
   *  @param privacyPolicyAcceptedOn Database column privacy_policy_accepted_on SqlType(timestamptz), Default(None)
   *  @param welcomeEmailSent Database column welcome_email_sent SqlType(bool), Default(false)
   *  @param coordinates Database column coordinates SqlType(geometry)
   *  @param `type` Database column type SqlType(supplier_type) */
  case class SupplierRow(id: java.util.UUID, email: String, cap: String, address: String, name: Option[String] = None, comune: Option[String] = None, regione: Option[String] = None, referencephone: Option[String] = None, externalIdCode: Option[Int] = None, vatNumber: Option[String] = None, cityIstatCode: Option[String] = None, province: Option[String] = None, enabled: Option[Boolean] = Some(false), termsAcceptedOn: Option[java.sql.Timestamp] = None, privacyPolicyAcceptedOn: Option[java.sql.Timestamp] = None, welcomeEmailSent: Boolean = false, coordinates: com.vividsolutions.jts.geom.Geometry, `type`: String)
  /** GetResult implicit for fetching SupplierRow objects using plain SQL queries */
  implicit def GetResultSupplierRow(implicit e0: GR[java.util.UUID], e1: GR[String], e2: GR[Option[String]], e3: GR[Option[Int]], e4: GR[Option[Boolean]], e5: GR[Option[java.sql.Timestamp]], e6: GR[Boolean], e7: GR[com.vividsolutions.jts.geom.Geometry]): GR[SupplierRow] = GR{
    prs => import prs._
    SupplierRow.tupled((<<[java.util.UUID], <<[String], <<[String], <<[String], <<?[String], <<?[String], <<?[String], <<?[String], <<?[Int], <<?[String], <<?[String], <<?[String], <<?[Boolean], <<?[java.sql.Timestamp], <<?[java.sql.Timestamp], <<[Boolean], <<[com.vividsolutions.jts.geom.Geometry], <<[String]))
  }
  /** Table description of table supplier. Objects of this class serve as prototypes for rows in queries.
   *  NOTE: The following names collided with Scala keywords and were escaped: type */
  class Supplier(_tableTag: Tag) extends profile.api.Table[SupplierRow](_tableTag, Some("trovamascherine"), "supplier") {
    def * = (id, email, cap, address, name, comune, regione, referencephone, externalIdCode, vatNumber, cityIstatCode, province, enabled, termsAcceptedOn, privacyPolicyAcceptedOn, welcomeEmailSent, coordinates, `type`) <> (SupplierRow.tupled, SupplierRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(email), Rep.Some(cap), Rep.Some(address), name, comune, regione, referencephone, externalIdCode, vatNumber, cityIstatCode, province, enabled, termsAcceptedOn, privacyPolicyAcceptedOn, Rep.Some(welcomeEmailSent), Rep.Some(coordinates), Rep.Some(`type`)).shaped.<>({r=>import r._; _1.map(_=> SupplierRow.tupled((_1.get, _2.get, _3.get, _4.get, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16.get, _17.get, _18.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(uuid), PrimaryKey */
    val id: Rep[java.util.UUID] = column[java.util.UUID]("id", O.PrimaryKey)
    /** Database column email SqlType(varchar), Length(255,true) */
    val email: Rep[String] = column[String]("email", O.Length(255,varying=true))
    /** Database column cap SqlType(varchar), Length(255,true) */
    val cap: Rep[String] = column[String]("cap", O.Length(255,varying=true))
    /** Database column address SqlType(varchar), Length(255,true) */
    val address: Rep[String] = column[String]("address", O.Length(255,varying=true))
    /** Database column name SqlType(varchar), Length(255,true), Default(None) */
    val name: Rep[Option[String]] = column[Option[String]]("name", O.Length(255,varying=true), O.Default(None))
    /** Database column comune SqlType(varchar), Length(255,true), Default(None) */
    val comune: Rep[Option[String]] = column[Option[String]]("comune", O.Length(255,varying=true), O.Default(None))
    /** Database column regione SqlType(varchar), Length(255,true), Default(None) */
    val regione: Rep[Option[String]] = column[Option[String]]("regione", O.Length(255,varying=true), O.Default(None))
    /** Database column referencephone SqlType(varchar), Length(255,true), Default(None) */
    val referencephone: Rep[Option[String]] = column[Option[String]]("referencephone", O.Length(255,varying=true), O.Default(None))
    /** Database column external_id_code SqlType(int4), Default(None) */
    val externalIdCode: Rep[Option[Int]] = column[Option[Int]]("external_id_code", O.Default(None))
    /** Database column vat_number SqlType(varchar), Length(255,true), Default(None) */
    val vatNumber: Rep[Option[String]] = column[Option[String]]("vat_number", O.Length(255,varying=true), O.Default(None))
    /** Database column city_istat_code SqlType(varchar), Length(255,true), Default(None) */
    val cityIstatCode: Rep[Option[String]] = column[Option[String]]("city_istat_code", O.Length(255,varying=true), O.Default(None))
    /** Database column province SqlType(varchar), Length(4,true), Default(None) */
    val province: Rep[Option[String]] = column[Option[String]]("province", O.Length(4,varying=true), O.Default(None))
    /** Database column enabled SqlType(bool), Default(Some(false)) */
    val enabled: Rep[Option[Boolean]] = column[Option[Boolean]]("enabled", O.Default(Some(false)))
    /** Database column terms_accepted_on SqlType(timestamptz), Default(None) */
    val termsAcceptedOn: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("terms_accepted_on", O.Default(None))
    /** Database column privacy_policy_accepted_on SqlType(timestamptz), Default(None) */
    val privacyPolicyAcceptedOn: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("privacy_policy_accepted_on", O.Default(None))
    /** Database column welcome_email_sent SqlType(bool), Default(false) */
    val welcomeEmailSent: Rep[Boolean] = column[Boolean]("welcome_email_sent", O.Default(false))
    /** Database column coordinates SqlType(geometry) */
    val coordinates: Rep[com.vividsolutions.jts.geom.Geometry] = column[com.vividsolutions.jts.geom.Geometry]("coordinates")
    /** Database column type SqlType(supplier_type)
     *  NOTE: The name was escaped because it collided with a Scala keyword. */
    val `type`: Rep[String] = column[String]("type")

    /** Index over (coordinates) (database name supplier_coordinates_idx) */
    val index1 = index("supplier_coordinates_idx", coordinates)
    /** Index over (enabled) (database name supplier_enabled_idx) */
    val index2 = index("supplier_enabled_idx", enabled)
  }
  /** Collection-like TableQuery object for table Supplier */
  lazy val Supplier = new TableQuery(tag => new Supplier(tag))

  /** Entity class storing rows of table SupplierToken
   *  @param supplierId Database column supplier_id SqlType(uuid)
   *  @param token Database column token SqlType(varchar), Length(255,true) */
  case class SupplierTokenRow(supplierId: java.util.UUID, token: String)
  /** GetResult implicit for fetching SupplierTokenRow objects using plain SQL queries */
  implicit def GetResultSupplierTokenRow(implicit e0: GR[java.util.UUID], e1: GR[String]): GR[SupplierTokenRow] = GR{
    prs => import prs._
    SupplierTokenRow.tupled((<<[java.util.UUID], <<[String]))
  }
  /** Table description of table supplier_token. Objects of this class serve as prototypes for rows in queries. */
  class SupplierToken(_tableTag: Tag) extends profile.api.Table[SupplierTokenRow](_tableTag, Some("trovamascherine"), "supplier_token") {
    def * = (supplierId, token) <> (SupplierTokenRow.tupled, SupplierTokenRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(supplierId), Rep.Some(token)).shaped.<>({r=>import r._; _1.map(_=> SupplierTokenRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column supplier_id SqlType(uuid) */
    val supplierId: Rep[java.util.UUID] = column[java.util.UUID]("supplier_id")
    /** Database column token SqlType(varchar), Length(255,true) */
    val token: Rep[String] = column[String]("token", O.Length(255,varying=true))

    /** Foreign key referencing Supplier (database name supplier_token_supplier_id_fkey) */
    lazy val supplierFk = foreignKey("supplier_token_supplier_id_fkey", supplierId, Supplier)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (token) (database name unique_token) */
    val index1 = index("unique_token", token, unique=true)
  }
  /** Collection-like TableQuery object for table SupplierToken */
  lazy val SupplierToken = new TableQuery(tag => new SupplierToken(tag))
}
