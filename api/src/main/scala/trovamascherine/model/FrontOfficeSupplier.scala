package trovamascherine.model

import java.time.Instant

case class FrontOfficeSupplier(
  data: SupplierData,
  supplies: List[Supply],
  lastUpdatedOn: Option[Instant],
)

object FrontOfficeSupplier {
  def apply(supplier: Supplier): FrontOfficeSupplier = new FrontOfficeSupplier(
    data = supplier.data.copy(
      phoneNumber = supplier.data.phoneNumber.filter(_ => supplier.config.showPhoneNumber),
    ),
    supplies = supplier.supplies,
    lastUpdatedOn = supplier.lastUpdatedOn,
  )
}
