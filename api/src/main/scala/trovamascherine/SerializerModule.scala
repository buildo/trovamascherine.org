package trovamascherine

import de.heikoseeberger.akkahttpcirce.ErrorAccumulatingCirceSupport
import io.circe.{Decoder, Encoder}
import io.circe.generic.semiauto.{deriveDecoder, deriveEncoder}
import io.circe.generic.extras.semiauto.{deriveUnwrappedDecoder, deriveUnwrappedEncoder}

import io.buildo.enumero.CirceSupport
import wiro.Auth

import trovamascherine.model._

trait SerializerModule extends ErrorAccumulatingCirceSupport with CirceSupport {

  implicit val encodeSupplierData: Encoder[SupplierData] = deriveEncoder
  implicit val decodeSupplierData: Decoder[SupplierData] = deriveDecoder

  implicit val encodeSupplierConfig: Encoder[SupplierConfig] = deriveEncoder
  implicit val decodeSupplierConfig: Decoder[SupplierConfig] = deriveDecoder

  implicit val encodeSupplier: Encoder[Supplier] = deriveEncoder
  implicit val decodeSupplier: Decoder[Supplier] = deriveDecoder

  implicit val encodeFrontOfficeSupplier: Encoder[FrontOfficeSupplier] = deriveUnwrappedEncoder
  implicit val decodeFrontOfficeSupplier: Decoder[FrontOfficeSupplier] = deriveUnwrappedDecoder

  implicit val encodeSupplierDataUpdate: Encoder[SupplierDataUpdate] = deriveEncoder
  implicit val decodeSupplierDataUpdate: Decoder[SupplierDataUpdate] = deriveDecoder

  implicit val encodeSupply: Encoder[Supply] = deriveEncoder
  implicit val decodeSupply: Decoder[Supply] = deriveDecoder

  implicit val authEncoder: Encoder[Auth] = deriveEncoder
  implicit val authDecoder: Decoder[Auth] = deriveDecoder
}
