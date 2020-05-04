import { useMemo } from "react";

let count = 0;

export function useUniqueID() {
  return useMemo(() => {
    count++;
    return `unique-id-${count}`;
  }, []);
}
