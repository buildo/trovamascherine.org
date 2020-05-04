import { createRef, useMemo } from "react";

export function useForwardedRef<T>(
  forwardedRef: React.Ref<T>
): [React.RefObject<T>, React.Ref<T>] {
  return useMemo(() => {
    if (forwardedRef) {
      if (typeof forwardedRef === "function") {
        const ownRef = createRef<T>();
        return [
          ownRef,
          (instance: T | null) => {
            forwardedRef(instance);
            // `current` is not mutable... `RefObject` is an invariance hell
            (ownRef as any).current = instance;
          },
        ];
      } else {
        return [forwardedRef, forwardedRef];
      }
    } else {
      const ownRef = createRef<T>();
      return [ownRef, ownRef];
    }
  }, [forwardedRef]);
}
