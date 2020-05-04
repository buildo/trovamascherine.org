import * as t from "io-ts";
import { SupplierData, SupplyData } from "./domain";
import { fetchAPI } from "./fetchAPI";
import { pipe } from "fp-ts/lib/pipeable";
import { chainEitherWK } from "./TaskEither";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { flow } from "fp-ts/lib/function";
import { either, taskEither } from "fp-ts";
import { TaskEither } from "fp-ts/lib/TaskEither";

const MapSearchResults = t.array(SupplierData, "MapSearchResult");

export function getMapSearchResults(): TaskEither<
  unknown,
  Array<SupplierData>
> {
  return pipe(
    fetchAPI({ method: "GET", url: ["supplier", "list"] }),
    chainEitherWK(MapSearchResults.decode)
  );
}

export function getSupplierData(
  supplierId: NonEmptyString
): TaskEither<unknown, SupplierData> {
  return pipe(
    fetchAPI({
      method: "GET",
      url: ["supplier", `read?supplierId=${NonEmptyString.encode(supplierId)}`],
    }),
    chainEitherWK(SupplierData.decode)
  );
}

export type GetSupplierDataByTokenError = "Generic" | "InvalidToken";
export const invalidTokenError: GetSupplierDataByTokenError = "InvalidToken";
export const genericError: GetSupplierDataByTokenError = "Generic";

export function getSupplierDataByToken(
  token: string
): TaskEither<GetSupplierDataByTokenError, SupplierData> {
  return pipe(
    fetchAPI({
      method: "GET",
      url: ["supplier", "readByToken"],
      token: token,
    }),
    taskEither.mapLeft(() => genericError),
    taskEither.chain(res =>
      res === "Invalid token"
        ? taskEither.left(invalidTokenError)
        : taskEither.right(res)
    ),
    taskEither.chainEitherK(
      flow(
        SupplierData.decode,
        either.mapLeft(() => genericError)
      )
    )
  );
}

export function updateSupplyData(
  token: string,
  supplies: SupplyData[]
): TaskEither<unknown, unknown> {
  return pipe(
    fetchAPI({
      method: "POST",
      url: ["supplier", "update"],
      body: { data: supplies },
      token: token,
    }),
    chainEitherWK(t.unknown.decode)
  );
}

export function acceptTerms(token: string): TaskEither<unknown, unknown> {
  return pipe(
    fetchAPI({
      method: "POST",
      url: ["supplier", "acceptTerms"],
      body: {},
      token: token,
    }),
    chainEitherWK(t.unknown.decode)
  );
}
