import { style } from "treat";
import { spaceUnit, grey09, borderRadius } from "../../variables";

export const form = style({
  padding: `${3 * spaceUnit}px 25px`,
});

export const formForm = style({
  width: "100%",
  maxWidth: "500px",
});

export const fieldSet = style({
  width: "100%",
  backgroundColor: grey09,
  padding: 3 * spaceUnit,
  borderRadius,
});
