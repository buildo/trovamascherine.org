import { style } from "treat";
import {
  primary,
  white,
  fontWeightBold,
  overlayBoxShadow,
  primaryHover2,
} from "../../variables";

export const pharmacistCTAContainer = style({
  position: "fixed",
  bottom: 10,
  width: "100%",
  pointerEvents: "none",

  "@media": {
    "(min-width: 801px)": {
      bottom: 48,
    },
  },
});

export const pharmacistCTA = style({
  backgroundColor: white,
  color: primary,
  borderRadius: "22px",
  height: "44px",
  padding: "0 40px",
  fontWeight: fontWeightBold,
  boxShadow: overlayBoxShadow,
  cursor: "pointer",
  pointerEvents: "all",

  ":hover": {
    color: white,
    backgroundColor: primaryHover2,
  },
});
