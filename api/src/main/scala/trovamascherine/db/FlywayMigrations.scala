package trovamascherine.db

import org.apache.logging.log4j.scala.Logging
import org.flywaydb.core.Flyway
import cats.data.NonEmptyList
import pureconfig._

import trovamascherine.config.DBConfig

trait FlywayMigrations extends Logging {
  implicit def camelCaseHint[T]: ProductHint[T] =
    ProductHint[T](ConfigFieldMapping(CamelCase, CamelCase))

  def runMigrations(args: Array[String], dbConfig: DBConfig): Unit = {
    val flyway = Flyway
      .configure()
      .dataSource(dbConfig.url, dbConfig.user, dbConfig.password)
      .schemas(dbConfig.schema)
      .table(dbConfig.schemaVersionTableName)
      .locations(dbConfig.locations)
      .load()

    if (args.contains("info")) {
      logger.info(
        flyway
          .info()
          .all
          .map { info =>
            (
              info.getState,
              info.getVersion,
              info.getDescription,
            ).toString
          }
          .mkString("\n"),
      )
    }

    if (args.contains("clean") || dbConfig.clean) {
      flyway.clean()
    }

    if (args.contains("validate") || dbConfig.validate) {
      flyway.validate()
    }

    if (args.contains("migrate") || dbConfig.migrate) {
      logger.info {
        NonEmptyList.fromList(flyway.info().pending.toList) match {
          case Some(migrations) =>
            migrations
              .map(info => s"v${info.getVersion} - ${info.getDescription}")
              .toList
              .mkString(
                "The following migrations will be applied:\n   - ",
                "\n   - ",
                "",
              )
          case None => "No new migrations to apply"
        }
      }
      val migrated = flyway.migrate()
      if (migrated > 0) logger.info(s"${migrated} migration(s) applied.")
    }

    if (args.contains("repair")) {
      flyway.repair()
    }

    if (args.contains("generate")) {
      CustomizedCodeGenerator.run(dbConfig)
    }
  }
}
