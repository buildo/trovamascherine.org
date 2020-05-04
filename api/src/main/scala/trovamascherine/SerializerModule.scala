package trovamascherine

import de.heikoseeberger.akkahttpcirce.ErrorAccumulatingCirceSupport
import io.circe.{Decoder, Encoder}
import io.circe.generic.semiauto.{deriveDecoder, deriveEncoder}

import io.buildo.enumero.CirceSupport
import wiro.Auth

import trovamascherine.model._

trait SerializerModule extends ErrorAccumulatingCirceSupport with CirceSupport {

  implicit val encodeSupplier: Encoder[Supplier] = deriveEncoder
  implicit val decodeSupplier: Decoder[Supplier] = deriveDecoder

  implicit val encodeSupply: Encoder[Supply] = deriveEncoder
  implicit val decodeSupply: Decoder[Supply] = deriveDecoder

  implicit val authEncoder: Encoder[Auth] = deriveEncoder
  implicit val authDecoder: Decoder[Auth] = deriveDecoder
}
