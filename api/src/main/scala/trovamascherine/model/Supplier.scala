package trovamascherine.model

import java.time.Instant
import java.util.UUID

case class Supplier(
  id: UUID,
  latitude: Double,
  longitude: Double,
  address: String,
  cap: String,
  city: Option[String],
  province: Option[String],
  name: Option[String],
  vatNumber: Option[String],
  lastUpdatedOn: Option[Instant],
  supplies: List[Supply],
  termsAcceptedOn: Option[Instant],
  privacyPolicyAcceptedOn: Option[Instant],
)
