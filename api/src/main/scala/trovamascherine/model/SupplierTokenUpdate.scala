package trovamascherine.model

import java.util.UUID

case class SupplierTokenUpdate(
  supplierId: UUID,
  email: String,
  token: String,
)
