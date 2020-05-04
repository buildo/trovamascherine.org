package trovamascherine

import org.scalatest._
import org.scalactic._

trait SpecStyle extends AsyncFlatSpec with Matchers with TypeCheckedTripleEquals // TypeCheckedTripleEquals must go after Matchers, see https://github.com/scalatest/scalatest/issues/1036
