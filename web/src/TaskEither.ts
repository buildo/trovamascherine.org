import { TaskEither, chain, chainEitherK } from "fp-ts/lib/TaskEither";
import { Either } from "fp-ts/lib/Either";

// based on https://github.com/gcanti/fp-ts/issues/904

export function chainW<D, A, B>(
  f: (a: A) => TaskEither<D, B>
): <E>(ma: TaskEither<E, A>) => TaskEither<E | D, B> {
  return chain(f) as any;
}

export function chainEitherWK<D, A, B>(
  f: (a: A) => Either<D, B>
): <E>(ma: TaskEither<E, A>) => TaskEither<E | D, B> {
  return chainEitherK(f) as any;
}
