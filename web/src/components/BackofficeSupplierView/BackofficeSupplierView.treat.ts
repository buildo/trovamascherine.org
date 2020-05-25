import { style } from "treat";
import { spaceUnit } from "../../variables";

export const infoIcon = style({
  cursor: "pointer",
  padding: 30,
});

export const infoIconMobile = style({
  position: "relative",
  top: -22,
  padding: 0,
  justifyContent: "flex-end",
  right: 10,
});

export const thankYou = style({
  padding: `${3 * spaceUnit}px 100px`,
});

export const thankYouMobile = style({
  padding: `${3 * spaceUnit}px 25px`,
  maxWidth: "400px",
});

export const legal = style({
  textAlign: "center",
});
