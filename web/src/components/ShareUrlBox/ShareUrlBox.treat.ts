import { style } from "treat";
import {
  spaceUnit,
  grey09,
  white,
  borderRadiusUrl,
  linkColor,
} from "../../variables";

export const info = style({
  padding: `${3 * spaceUnit}px 25px`,
  backgroundColor: grey09,
});

export const sharingLabel = style({
  margin: "0px 0px 0px 0px",
});

export const fieldSet = style({
  backgroundColor: white,
  padding: 3 * spaceUnit,
  borderRadius: borderRadiusUrl,
  marginTop: "9px",
  overflowWrap: "anywhere",
  color: linkColor,
  fontSize: "12px",
});
