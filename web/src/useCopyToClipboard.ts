import { useState, useEffect, useMemo } from "react";
import _useCopyToClipboard from "react-use/lib/useCopyToClipboard";

export function useCopyToClipboard(value: string): [() => unknown, boolean] {
  const [, copyToClipboard] = _useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timeout: number | undefined;
    if (copied) {
      timeout = window.setTimeout(() => setCopied(false), 3000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [copied]);

  const copy = useMemo(
    () => () => {
      copyToClipboard(value);
      setCopied(true);
    },
    [value, copyToClipboard]
  );

  return [copy, copied];
}
