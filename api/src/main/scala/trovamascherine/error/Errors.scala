package trovamascherine.error

import org.apache.logging.log4j.scala.Logging

sealed trait ApiError {
  val message: String
}

object ApiError extends Logging {

  case class FatalError(message: String) extends ApiError
  case class NotFound(message: String = "Not found") extends ApiError
  case class InvalidToken(message: String = "Invalid token") extends ApiError

  def toFatal[E, T](e: Either[E, T]): Either[ApiError, T] =
    e.left.map(e => {
      val err = FatalError(e.toString)
      logger.error(err.message)
      err
    })

  def mapErrors[T](e: Either[String, Option[T]]): Either[ApiError, T] =
    e match {
      case Right(Some(r)) => Right(r)
      case Right(None)    => Left(NotFound())
      case Left(m: String) =>
        val err = FatalError(m)
        logger.error(err)
        Left(err)
    }
}
