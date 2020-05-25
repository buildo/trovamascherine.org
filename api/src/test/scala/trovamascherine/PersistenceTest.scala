package trovamascherine.test

import munit.FunSuite

import trovamascherine.persistence.db.Tables.profile.api.Database
import trovamascherine.config.Config
import trovamascherine.fixtures.FixturesCreator

abstract class PersistenceTest extends FunSuite with FixturesCreator {
  val db = Database.forConfig("db")
  val config = pureconfig.loadConfigOrThrow[Config]
  implicit val ec = munitExecutionContext

  override def beforeEach(context: BeforeEach): Unit = {
    runMigrations(Array("clean", "migrate"), config.db)
    createFixtures()
    ()
  }

  override def afterAll() = {
    db.close
  }
}
