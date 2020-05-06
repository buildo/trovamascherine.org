import { either, option } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";
import { Option } from "fp-ts/lib/Option";
import { drawForest } from "fp-ts/lib/Tree";
import { Decoder } from "io-ts/lib/Decoder";

function getItem<A>(key: string, D: Decoder<A>): Option<A> {
  return pipe(
    option.tryCatch(() => localStorage.getItem(key)),
    option.chain(option.fromNullable),
    option.chain(a => option.tryCatch(() => JSON.parse(a))),
    option.chain(a =>
      option.fromEither(
        pipe(
          D.decode(a),
          either.mapLeft(e => console.error(drawForest(e)))
        )
      )
    )
  );
}

function setItem<A>(key: string, item: A): void {
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.error(e);
  }
}

export const LocalStorage = {
  getItem,
  setItem,
};
