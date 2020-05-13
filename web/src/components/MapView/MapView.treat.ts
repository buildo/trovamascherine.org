import { style } from "treat";
import {
  primary,
  white,
  fontWeightBold,
  overlayBoxShadow,
  primaryHover2,
} from "../../variables";
import { isMobileMediaQuery } from "../../useMatchMedia";

export const pharmacistCTA = style({
  position: "absolute",
  left: 84,
  top: 10,
  backgroundColor: white,
  color: primary,
  borderRadius: "22px",
  height: "44px",
  padding: "0 40px",
  fontSize: "14px",
  fontWeight: fontWeightBold,
  boxShadow: overlayBoxShadow,
  cursor: "pointer",

  ":hover": {
    color: white,
    backgroundColor: primaryHover2,
  },

  "@media": {
    [isMobileMediaQuery]: {
      left: "auto",
      right: 16,
      padding: "0 30px",
    },
  },
});
