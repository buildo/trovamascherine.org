import * as TE from "fp-ts/lib/TaskEither";
import * as RD from "./RemoteData";
import { useState, useEffect } from "react";

export function useRemoteData<E, A>(
  task: TE.TaskEither<E, A>
): RD.RemoteData<E, A> {
  const [data, setData] = useState<RD.RemoteData<E, A>>(RD.remoteLoading);
  useEffect(() => {
    let isActive = true;
    setData(RD.remoteLoading);
    task().then(data => {
      if (isActive) {
        setData(RD.fromEither(data));
      }
    });
    return () => {
      isActive = false;
    };
  }, [task]);
  return data;
}
