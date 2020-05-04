import { KeyboardEvent } from "react";

export const keyCodes = {
  Enter: 13,
  Space: 32,
} as const;

export function fromKeyCodeFilter<A, B>(
  code: typeof keyCodes[keyof typeof keyCodes],
  f: (event: KeyboardEvent<A>) => B
): (event: KeyboardEvent<A>) => B | void {
  return event => {
    return event.keyCode === code ? f(event) : undefined;
  };
}
