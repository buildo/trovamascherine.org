package trovamascherine.error

import java.util.UUID

import mailo.{MailError, MailPersistenceError}

sealed trait Error

object Error {

  case class MailoGenericError(message: String) extends Error
  case class MailoPersistenceError(message: String) extends Error

  def fromMailoError(e: MailError): Error = e match {
    case MailPersistenceError(message) => MailoPersistenceError(message)
    case e: MailError                  => MailoGenericError(e.message)
  }

  case class InvalidToken(token: String) extends Error

  object DuplicateGoodsInSupplies extends Error

  case class SupplierNotFound(supplier: UUID) extends Error

  case class TermsNotAccepted(supplierId: UUID) extends Error

  case class PrivacyPolicyNotAccepted(supplierId: UUID) extends Error

  object TokenNotFound extends Error

  case class Defect(e: Throwable) extends Error

}
