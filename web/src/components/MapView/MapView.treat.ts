import { style } from "treat";
import { isMobileMediaQuery } from "../../useMatchMedia";

export const pharmacistCTA = style({
  position: "absolute",
  left: 84,
  top: 10,

  "@media": {
    [isMobileMediaQuery]: {
      left: "auto",
      right: 16,
    },
  },
});
