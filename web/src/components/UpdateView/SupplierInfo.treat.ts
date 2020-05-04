import { style } from "treat";
import { spaceUnit, grey07, linkColor } from "../../variables";

export const info = style({
  padding: `${3 * spaceUnit}px 25px`,
  backgroundColor: grey07,
  minWidth: "400px !important",
  maxWidth: 400,
});

export const address = style({
  color: linkColor,
});

export const infoMobile = style({
  maxWidth: "100%",
});
