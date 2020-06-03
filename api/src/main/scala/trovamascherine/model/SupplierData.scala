package trovamascherine.model

import java.time.Instant
import java.util.UUID

case class SupplierData(
  id: UUID,
  latitude: Double,
  longitude: Double,
  address: String,
  email: String,
  cap: String,
  city: String,
  province: String,
  name: String,
  vatNumber: Option[String],
  phoneNumber: Option[String],
  termsAcceptedOn: Option[Instant],
  privacyPolicyAcceptedOn: Option[Instant],
)
