package trovamascherine.fixtures

import trovamascherine.persistence.config.DBConfig
import trovamascherine.persistence.db.FlywayMigrations

trait FixturesCreator extends FlywayMigrations {
  def createFixtures() = {
    val dbConfig = pureconfig.loadConfigOrThrow[DBConfig]("db")
    runMigrations(Array("migrate"), dbConfig.copy(locations = "trovamascherine/fixtures/db"))
  }
}

object Boot extends FixturesCreator {
  def main(args: Array[String]): Unit = createFixtures()
}
