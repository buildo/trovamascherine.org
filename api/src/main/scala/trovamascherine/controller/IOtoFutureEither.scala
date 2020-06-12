package trovamascherine.controller

import trovamascherine.error.Error
import scala.concurrent.Future
import zio.{IO, Runtime, ZEnv}

trait IOToFutureEither {
  implicit class IOtoFutureEither[A](io: IO[Error, A]) {
    def toFutureEitherCatchAllDefects(implicit runtime: Runtime[ZEnv]): Future[Either[Error, A]] =
      runtime.unsafeRunToFuture(io.catchAllDefect(d => IO.fail(Error.Defect(d))).either)
  }
}
