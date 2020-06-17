package trovamascherine.service

import zio.IO
import org.apache.logging.log4j.scala.Logging

import trovamascherine.error.Error
import trovamascherine.repository._
import trovamascherine.model.{NotificationFrequency, SupplierTokenUpdate}
import trovamascherine.HashModule

trait AuthService {
  def resetTokens(frequency: NotificationFrequency): IO[Error, Option[Int]]
}

object AuthService extends HashModule {
  def create(
    authRepo: AuthRepository,
    supplierRepo: SupplierRepository,
  ): AuthService = new AuthService with Logging {

    override def resetTokens(frequency: NotificationFrequency): IO[Error, Option[Int]] = {
      logger.info(
        s"Resetting tokens for suppliers with notification frequency ${NotificationFrequency.caseToString(frequency)}",
      )
      for {
        enabledSuppliers <- supplierRepo.listEnabled(frequency: NotificationFrequency)
        tokenUpdates: List[SupplierTokenUpdate] = enabledSuppliers.map(supplier =>
          SupplierTokenUpdate(supplier._1, supplier._2, randomToken),
        )
        result <- authRepo.updateTokens(tokenUpdates)
      } yield result
    }
  }
}
