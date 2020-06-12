package trovamascherine.service

import zio.IO

import trovamascherine.error.Error
import trovamascherine.repository._
import trovamascherine.model.SupplierTokenUpdate
import trovamascherine.HashModule

trait AuthService {
  def resetTokens(): IO[Error, Option[Int]]
}

object AuthService extends HashModule {
  def create(
    authRepo: AuthRepository,
    supplierRepo: SupplierRepository,
  ): AuthService = new AuthService {

    override def resetTokens(): IO[Error, Option[Int]] = {
      for {
        enabledSuppliers <- supplierRepo.listEnabled()
        suppliersToEmail: List[SupplierTokenUpdate] = enabledSuppliers.map(supplier =>
          SupplierTokenUpdate(supplier._1, supplier._2, randomToken),
        )
        result <- authRepo.updateTokens(suppliersToEmail)
      } yield result
    }
  }
}
