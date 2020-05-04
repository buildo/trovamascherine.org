package trovamascherine.error

import scala.concurrent.{ExecutionContext, Future}

import org.apache.logging.log4j.scala.Logging

trait Recoverable extends Logging {
  def recoverToEither[R](
    f: Future[R],
  )(implicit ec: ExecutionContext): Future[Either[String, R]] =
    f.map { Right(_) }.recover {
      case e =>
        logger.error("Future failed:", e)
        Left(e.toString)
    }
}
