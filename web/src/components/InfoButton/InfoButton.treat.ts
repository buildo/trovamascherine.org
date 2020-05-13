import { style } from "treat";
import {
  overlayBoxShadow,
  primaryHover,
  primary,
  white,
} from "../../variables";

export const infoButton = style({
  backgroundColor: primary,
  borderRadius: "22px",
  boxShadow: overlayBoxShadow,
  color: white,
  cursor: "pointer",
  height: "44px",
  width: "44px",
  fontStyle: "italic",
  textAlign: "center",
  verticalAlign: "center",
  fontSize: "30px",

  ":hover": {
    backgroundColor: primaryHover,
  },
});
