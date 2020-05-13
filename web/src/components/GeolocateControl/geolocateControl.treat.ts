import { style } from "treat";
import {
  primary,
  white,
  fontWeightBold,
  overlayBoxShadow,
  primaryHover,
  grey03,
} from "../../variables";

export const geolocateControlWrapper = style({
  backgroundColor: primary,
  color: white,
  borderRadius: 22,
  height: 44,
  padding: "0 20px",
  fontWeight: fontWeightBold,
  boxShadow: overlayBoxShadow,
  cursor: "pointer",

  ":hover": {
    color: white,
    backgroundColor: primaryHover,
  },
});

export const geolocateControlDisabled = style({
  backgroundColor: grey03,
  cursor: "not-allowed",
  pointerEvents: "none",
});

export const geolocateCopy = style({
  marginLeft: 5,
  fontWeight: fontWeightBold,
  fontSize: 14,
});
