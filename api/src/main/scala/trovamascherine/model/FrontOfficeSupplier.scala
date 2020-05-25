package trovamascherine.model

class FrontOfficeSupplier(
  val data: SupplierData,
) extends AnyVal

object FrontOfficeSupplier {
  def apply(supplier: Supplier): FrontOfficeSupplier = new FrontOfficeSupplier(
    supplier.data.copy(
      phoneNumber = supplier.data.phoneNumber.filter(_ => supplier.config.showPhoneNumber),
    ),
  )
}
