import { pipe } from "fp-ts/lib/pipeable";
import { identity } from "fp-ts/lib/function";
import * as NEA from "fp-ts/lib/NonEmptyArray";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import { config } from "./config";

export type FetchConfig = {
  url: NEA.NonEmptyArray<string>;
  token?: string;
} & (
  | {
      method: "GET";
    }
  | {
      method: "POST" | "PUT";
      body: unknown;
    }
);

export function fetchAPI(
  fetchConfig: FetchConfig
): TE.TaskEither<unknown, unknown> {
  const body =
    fetchConfig.method === "GET"
      ? E.right(undefined)
      : E.stringifyJSON(fetchConfig.body, identity);
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  if (fetchConfig.token) {
    headers.append("Authorization", `Token token=${fetchConfig.token}`);
  }
  const url = [config.apiEndpoint as string]
    .concat(fetchConfig.url.map(s => s.trim()))
    .join("/");

  return pipe(
    body,
    TE.fromEither,
    TE.chain(
      TE.tryCatchK(
        body =>
          fetch(url, {
            method: fetchConfig.method,
            cache: "no-cache",
            headers,
            body,
          }).then(res => res.json()),
        identity
      )
    )
  );
}
