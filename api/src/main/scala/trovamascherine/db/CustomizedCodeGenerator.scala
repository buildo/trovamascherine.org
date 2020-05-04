package trovamascherine.db

import scala.concurrent.duration._
import scala.concurrent.Await

import slick.sql.SqlProfile.ColumnOption

import trovamascherine.config.DBConfig

object CustomizedCodeGenerator {
  import scala.concurrent.ExecutionContext.Implicits.global

  val projectDir = System.getProperty("user.dir")

  val slickProfile: PostgisProfile = PostgisProfile

  val db = slickProfile.api.Database.forConfig("db")

  val included = Seq("supplier", "supplier_token", "good_supply")
  lazy val codegen = db.run {
    slickProfile.defaultTables
      .map(_.filter(t => included contains t.name.name))
      .flatMap(slickProfile.createModelBuilder(_, ignoreInvalidDefaults = true).buildModel)
  }.map { model =>
    new slick.codegen.SourceCodeGenerator(model) {
      override def Table = new Table(_) { table =>
        override def Column = new Column(_) { column =>
          override def rawType: String = {
            model.options
              .find(_.isInstanceOf[ColumnOption.SqlType])
              .flatMap { tpe =>
                tpe.asInstanceOf[ColumnOption.SqlType].typeName match {
                  case "geometry" => Option("com.vividsolutions.jts.geom.Geometry")
                  case _          => None
                }
              }
              .getOrElse {
                model.tpe match {
                  case _ =>
                    super.rawType

                }
              }
          }
        }
      }

      override def packageCode(
        profile: String,
        pkg: String,
        container: String,
        parentType: Option[String],
      ): String = {
        s"""
package ${pkg}
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object ${container} extends {
  val profile = ${profile}
} with ${container}

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait ${container}${parentType.map(t => s" extends $t").getOrElse("")} {
  val profile: $profile
  import profile.api._
  ${indent(code)}
}
      """.trim()
      }

    }
  }

  def run(config: DBConfig): Unit = {

    Await.result(
      codegen.map(
        _.writeToFile(
          config.profile,
          config.codeGen.outputDir,
          config.codeGen.`package`,
          "Tables",
          "Tables.scala",
        ),
      ),
      20.seconds,
    )
  }
}
