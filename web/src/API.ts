import * as t from "io-ts";
import {
  SupplyData,
  Supplier,
  SupplierDataUpdate,
  SupplierConfig,
  FrontOfficeSupplier,
} from "./domain";
import { fetchAPI } from "./fetchAPI";
import { pipe } from "fp-ts/lib/pipeable";
import { flow } from "fp-ts/lib/function";
import { either, taskEither } from "fp-ts";
import { TaskEither, chainEitherKW } from "fp-ts/lib/TaskEither";

const MapSearchResults = t.array(FrontOfficeSupplier, "MapSearchResult");

export function getMapSearchResults(): TaskEither<
  unknown,
  Array<FrontOfficeSupplier>
> {
  return pipe(
    fetchAPI({ method: "GET", url: ["supplier", "list"] }),
    chainEitherKW(MapSearchResults.decode)
  );
}

export type GetSupplierByTokenError = "Generic" | "InvalidToken";
export const invalidTokenError: GetSupplierByTokenError = "InvalidToken";
export const genericError: GetSupplierByTokenError = "Generic";

export function getSupplierByToken(
  token: string
): TaskEither<GetSupplierByTokenError, Supplier> {
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
        Supplier.decode,
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
    chainEitherKW(t.unknown.decode)
  );
}

export function updateSupplierConfig(
  token: string,
  data: SupplierConfig
): TaskEither<unknown, unknown> {
  return pipe(
    SupplierConfig.encode(data),
    body =>
      fetchAPI({
        method: "POST",
        url: ["supplier", "updateConfig"],
        body: { data: body },
        token: token,
      }),
    chainEitherKW(t.unknown.decode)
  );
}

export function updateSupplierData(
  token: string,
  data: SupplierDataUpdate
): TaskEither<unknown, unknown> {
  return pipe(
    SupplierDataUpdate.encode(data),
    body =>
      fetchAPI({
        method: "POST",
        url: ["supplier", "updateData"],
        body: { data: body },
        token: token,
      }),
    chainEitherKW(t.unknown.decode)
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
    chainEitherKW(t.unknown.decode)
  );
}
