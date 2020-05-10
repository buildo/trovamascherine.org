package trovamascherine.persistence.db

import com.github.tminglei.slickpg._

trait PostgisProfile extends ExPostgresProfile with PgPostGISSupport {

  override val api = new PostgisAPI {}

  trait PostgisAPI extends API with PostGISImplicits with PostGISAssistants
}

object PostgisProfile extends PostgisProfile
