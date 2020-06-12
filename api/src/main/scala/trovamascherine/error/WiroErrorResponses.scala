package trovamascherine.error

import io.buildo.enumero.CirceSupport
import wiro.server.akkaHttp._
import akka.http.scaladsl.model._
import akka.http.scaladsl.server._
import akka.http.scaladsl.server.Directives._
import io.circe.syntax._
import io.circe.Encoder

trait WiroErrorResponses extends CirceSupport {
  implicit def runtimeExceptionHandler: ExceptionHandler = ExceptionHandler {
    case ex: RuntimeException =>
      complete(
        HttpResponse(
          status = StatusCodes.InternalServerError,
          entity = ex.getMessage,
        ),
      )
  }

  implicit def eitherToHttpResponse[A, B](
    implicit aCodec: ToHttpResponse[A],
    bCodec: ToHttpResponse[B],
  ): ToHttpResponse[Either[A, B]] =
    _.fold(
      a => aCodec.response(a),
      b => bCodec.response(b),
    )

  protected def jsonResponse[E: Encoder](e: E, s: StatusCode): HttpResponse = HttpResponse(
    status = s,
    entity = jsonEntity(e),
  )

  protected def jsonEntity[E: Encoder](e: E): ResponseEntity =
    HttpEntity(ContentType(MediaTypes.`application/json`), e.asJson.noSpaces)

  implicit val errorToResponse: ToHttpResponse[Error] = {
    case Error.MailoGenericError(_) =>
      jsonResponse("mail generic error", StatusCodes.InternalServerError)
    case Error.MailoPersistenceError(_) =>
      jsonResponse("mail persistence error", StatusCodes.InternalServerError)
    case Error.InvalidToken(_)            => jsonResponse("invalid token", StatusCodes.Unauthorized)
    case Error.DuplicateGoodsInSupplies   => jsonResponse("duplicate goods", StatusCodes.BadRequest)
    case Error.SupplierNotFound(supplier) => jsonResponse(supplier, StatusCodes.NotFound)
    case Error.TermsNotAccepted(supplierId) =>
      jsonResponse(supplierId, StatusCodes.PreconditionRequired)
    case Error.PrivacyPolicyNotAccepted(supplierId) =>
      jsonResponse(supplierId, StatusCodes.PreconditionRequired)
    case Error.TokenNotFound => jsonResponse("token not found", StatusCodes.NotFound)
    case Error.Defect(_) =>
      jsonResponse("unexpected internal error", StatusCodes.InternalServerError)
  }
}
