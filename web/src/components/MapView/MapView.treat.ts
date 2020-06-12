import { style } from "treat";
import { isMobileMediaQuery } from "../../useMatchMedia";
import { spaceUnit } from "../../variables";

export const pharmacistCTA = style({
  position: "absolute",
  left: 16,
  bottom: 12 * spaceUnit,
  pointerEvents: "none",

  "@media": {
    [isMobileMediaQuery]: {
      left: "auto",
      width: "100%",
    },
  },
});
