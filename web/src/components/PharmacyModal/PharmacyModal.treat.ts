import { style } from "treat";
import * as vars from "../../variables";

export const pharmacyModalContent = style({
  height: "100%",
  padding: "10px",
});

export const pharmacyName = style({
  fontSize: "18px",
  fontWeight: 600,
  marginBottom: "10px",
});

export const pharmacyModalContentAddress = style({
  fontSize: "14px",
});

export const footer = style({
  padding: 6 * vars.spaceUnit,
  paddingTop: 7 * vars.spaceUnit,
  paddingBottom: 7 * vars.spaceUnit,
  width: "100%",
  backgroundColor: vars.green02,
  borderBottomLeftRadius: vars.borderRadius,
  borderBottomRightRadius: vars.borderRadius,
});
