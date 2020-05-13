import { Decoder } from "io-ts/lib/Decoder";
import { Option } from "fp-ts/lib/Option";
import { option } from "fp-ts";
import qs from "qs";

function updateQueryParams(queryParams: qs.ParsedQs): void {
  const path =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    qs.stringify(queryParams, { addQueryPrefix: true });
  window.history.replaceState({ path }, "", path);
}

function set(params: Record<string, string>): void {
  const queryParams = {
    ...qs.parse(window.location.search.slice(1)),
    ...params,
  };
  updateQueryParams(queryParams);
}

function get<A>(key: string, D: Decoder<A>): Option<A> {
  const queryParams = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  return option.fromEither(D.decode(queryParams[key]));
}

function getMany<A>(D: Decoder<A>): Option<A> {
  const queryParams = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  return option.fromEither(D.decode(queryParams));
}

function delete_(key: string): void {
  const queryParams = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  delete queryParams[key];
  updateQueryParams(queryParams);
}

export const QueryParams = {
  set,
  get,
  getMany,
  delete: delete_,
};
