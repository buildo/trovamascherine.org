package trovamascherine.error

import akka.http.scaladsl.model._
import io.circe.syntax._
import wiro.server.akkaHttp._

trait WiroErrorResponses {

  def statusForError(e: ApiError): StatusCode = e match {
    case _: ApiError.FatalError   => StatusCodes.InternalServerError
    case _: ApiError.NotFound     => StatusCodes.NotFound
    case _: ApiError.InvalidToken => StatusCodes.Unauthorized
  }

  implicit def errorToResponse: ToHttpResponse[ApiError] =
    error =>
      HttpResponse(
        status = statusForError(error),
        entity = HttpEntity(
          ContentType(MediaTypes.`application/json`),
          error.message.asJson.noSpaces,
        ),
      )

  implicit def toResponse: ToHttpResponse[String] =
    error =>
      HttpResponse(
        status = StatusCodes.UnprocessableEntity,
        entity = error,
      )

}
