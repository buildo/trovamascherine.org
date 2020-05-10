package trovamascherine.persistence

import trovamascherine.persistence.db.FlywayMigrations
import trovamascherine.persistence.config.DBConfig

object Boot extends FlywayMigrations {
  def main(args: Array[String]): Unit = {
    val dbConfig = pureconfig.loadConfigOrThrow[DBConfig]("db")
    runMigrations(args, dbConfig)
  }
}
