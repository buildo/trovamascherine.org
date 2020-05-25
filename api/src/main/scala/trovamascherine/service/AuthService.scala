package trovamascherine.service

import scala.concurrent.{ExecutionContext, Future}

import trovamascherine.repository._
import trovamascherine.model.SupplierTokenUpdate
import trovamascherine.HashModule

trait AuthService {
  def resetTokens(): Future[Either[String, Option[Int]]]
}

object AuthService extends HashModule {
  def create(
    authRepo: AuthRepository,
    supplierRepo: SupplierRepository,
  )(implicit ec: ExecutionContext): AuthService = new AuthService {

    override def resetTokens(): Future[Either[String, Option[Int]]] = {
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
