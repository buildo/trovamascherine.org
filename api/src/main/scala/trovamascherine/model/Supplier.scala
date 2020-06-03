package trovamascherine.model

import java.time.Instant

case class Supplier(
  data: SupplierData,
  supplies: List[Supply],
  lastUpdatedOn: Option[Instant],
  config: SupplierConfig,
)
