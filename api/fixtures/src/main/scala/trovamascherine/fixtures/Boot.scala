package trovamascherine.fixtures

import trovamascherine.config.Config
import trovamascherine.db.FlywayMigrations

object Boot extends FlywayMigrations {
  def main(args: Array[String]): Unit = {
    val config = pureconfig.loadConfigOrThrow[Config]
    runMigrations(args, config.db)
  }
}
