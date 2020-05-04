import { TaskEither } from "fp-ts/lib/TaskEither";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Eq, eqStrict } from "fp-ts/lib/Eq";
import { useRemoteData } from "./useRemoteData";
import { Option, fromNullable, fold } from "fp-ts/lib/Option";
import { useRef, useEffect, useState, useMemo } from "react";
import { pipe } from "fp-ts/lib/pipeable";
import { constFalse } from "fp-ts/lib/function";
import { config } from "./config";
import { RemoteData } from "./RemoteData";

function usePrevious<T>(value: T): Option<T> {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return fromNullable(ref.current);
}

export function useAPI<R, E, A>(
  apiCall: (input: R) => TaskEither<E, A>,
  input: R,
  Eq: Eq<R>
): RemoteData<E, A>;
export function useAPI<R extends void, E, A>(
  apiCall: () => TaskEither<E, A>,
  input?: R,
  Eq?: Eq<R>
): RemoteData<E, A>;
export function useAPI<R, E, A>(
  apiCall: any,
  input: R = undefined as any,
  Eq: Eq<R> = eqStrict
): RemoteData<E, A> {
  const previousInput = usePrevious(input);
  const [inputEquality, setInputEquality] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const inputChanged = pipe(
      previousInput,
      fold(constFalse, previousInput => !Eq.equals(previousInput, input))
    );
    if (inputChanged) {
      setInputEquality(inputEquality + 1);
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const task = useMemo(() => apiCall(input), [
    apiCall,
    inputEquality,
    config.apiEndpoint,
  ]);

  return useRemoteData(task);
}
