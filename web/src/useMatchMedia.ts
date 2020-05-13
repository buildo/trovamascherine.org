import { useState, useEffect } from "react";

export function useMatchMedia(query: string) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query, matches]);

  return matches;
}

export const isMobileMediaQuery = "(max-width: 800px)";

export function useIsMobile() {
  return useMatchMedia(isMobileMediaQuery);
}
