import { Monad2 } from "fp-ts/lib/Monad";
import { Bifunctor2 } from "fp-ts/lib/Bifunctor";
import { Alt2 } from "fp-ts/lib/Alt";
import * as Eq from "fp-ts/lib/Eq";
import { constFalse, constant } from "fp-ts/lib/function";
import { pipeable, pipe } from "fp-ts/lib/pipeable";
import * as E from "fp-ts/lib/Either";

declare module "fp-ts/lib/HKT" {
  interface URItoKind2<E, A> {
    RemoteData: RemoteData<E, A>;
  }
}

export const URI = "RemoteData";

export type URI = typeof URI;

export interface RemoteLoading {
  readonly _tag: "Loading";
}

export interface RemoteFailure<E> {
  readonly _tag: "Failure";
  readonly failure: E;
  readonly loading: boolean;
}

export interface RemoteSuccess<A> {
  readonly _tag: "Success";
  readonly success: A;
  readonly loading: boolean;
}

export type RemoteData<E, A> =
  | RemoteLoading
  | RemoteFailure<E>
  | RemoteSuccess<A>;

/**
 * A `RemoteLoading`
 */
export const remoteLoading: RemoteData<never, never> = {
  _tag: "Loading",
};

/**
 * Constructs a `RemoteFailure`
 */
export function remoteFailure<E = never, A = never>(
  failure: E,
  loading: boolean
): RemoteData<E, A> {
  return { _tag: "Failure", failure, loading };
}

/**
 * Constructs a `RemoteSuccess`
 */
export function remoteSuccess<E = never, A = never>(
  success: A,
  loading: boolean
): RemoteData<E, A> {
  return { _tag: "Success", success, loading };
}

export function fold<E, A, B>(
  onLoading: () => B,
  onFailure: (failure: E, loading: boolean) => B,
  onSuccess: (success: A, loading: boolean) => B
): (ma: RemoteData<E, A>) => B {
  return ma => {
    switch (ma._tag) {
      case "Loading":
        return onLoading();
      case "Failure":
        return onFailure(ma.failure, ma.loading);
      case "Success":
        return onSuccess(ma.success, ma.loading);
    }
  };
}

function _map<E = never, A = never, B = never>(
  fa: RemoteData<E, A>,
  f: (a: A) => B
): RemoteData<E, B> {
  return pipe(
    fa,
    fold(constant(remoteLoading), remoteFailure, (success, loading) =>
      remoteSuccess(f(success), loading)
    )
  );
}

function _of<E = never, A = never>(success: A): RemoteData<E, A> {
  return remoteSuccess(success, false);
}

function _mapLeft<E = never, A = never, B = never>(
  fa: RemoteData<E, A>,
  l: (l: E) => B
): RemoteData<B, A> {
  return pipe(
    fa,
    fold(
      constant(remoteLoading),
      (failure, loading) => remoteFailure<B, A>(l(failure), loading),
      remoteSuccess
    )
  );
}

function _bimap<E = never, A = never, B = never, C = never>(
  fa: RemoteData<E, A>,
  l: (l: E) => B,
  r: (a: A) => C
): RemoteData<B, C> {
  return pipe(
    fa,
    fold(
      constant(remoteLoading),
      (failure, loading) => remoteFailure(l(failure), loading),
      (success, loading) => remoteSuccess(r(success), loading)
    )
  );
}

function _chain<L, A, B>(
  fa: RemoteData<L, A>,
  f: (a: A) => RemoteData<L, B>
): RemoteData<L, B> {
  return pipe(fa, fold(constant(remoteLoading), remoteFailure, f));
}

function _alt<E, A>(
  fx: RemoteData<E, A>,
  fy: () => RemoteData<E, A>
): RemoteData<E, A> {
  return pipe(fx, fold(fy, fy, remoteSuccess));
}

export const remoteData: Bifunctor2<URI> & Monad2<URI> & Alt2<URI> = {
  URI,
  map: _map,
  ap: (fab, fa) => _chain(fab, f => _map(fa, f)),
  of: _of,
  mapLeft: _mapLeft,
  bimap: _bimap,
  chain: _chain,
  alt: _alt,
};

const {
  ap,
  apFirst,
  apSecond,
  bimap,
  chain,
  chainFirst,
  flatten,
  map,
  mapLeft,
} = pipeable(remoteData);

export {
  ap,
  apFirst,
  apSecond,
  bimap,
  chain,
  chainFirst,
  flatten,
  map,
  mapLeft,
};

export function getEq<E, A>(
  Eqe: Eq.Eq<E>,
  Eqa: Eq.Eq<A>
): Eq.Eq<RemoteData<E, A>> {
  return Eq.fromEquals((a, b) =>
    pipe(
      a,
      fold(
        () => b._tag === "Loading",
        fa =>
          pipe(
            b,
            fold(constFalse, fb => Eqe.equals(fa, fb), constFalse)
          ),
        sa =>
          pipe(
            b,
            fold(constFalse, constFalse, sb => Eqa.equals(sa, sb))
          )
      )
    )
  );
}

export function fromEither<E, A>(ma: E.Either<E, A>): RemoteData<E, A> {
  return pipe(
    ma,
    E.fold(
      error => remoteFailure(error, false),
      value => remoteSuccess(value, false)
    )
  );
}
