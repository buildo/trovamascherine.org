import { option, either } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";
import { Option } from "fp-ts/lib/Option";
import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import { flow } from "fp-ts/lib/function";

function getItem<A, O>(key: string, C: t.Type<A, O>): Option<A> {
  return pipe(
    option.tryCatch(() => localStorage.getItem(key)),
    option.chain(option.fromNullable),
    option.chain(a => option.tryCatch(() => JSON.parse(a))),
    option.chain(
      flow(
        C.decode,
        either.mapLeft(e => console.error(failure(e).join("\n"))),
        option.fromEither
      )
    )
  );
}

function setItem<A, O>(key: string, C: t.Type<A, O>, item: A): void {
  try {
    localStorage.setItem(key, JSON.stringify(C.encode(item)));
  } catch (e) {
    console.error(e);
  }
}

export const LocalStorage = {
  getItem,
  setItem,
};
