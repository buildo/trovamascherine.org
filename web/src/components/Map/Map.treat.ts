import { style } from "treat";
import { spaceUnit } from "../../variables";

export const map = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const header = style({
  backgroundColor: "#282c34",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "calc(10px + 2vmin)",
  color: "white",
});

export const geolocateControlWrapper = style({
  position: "absolute",
  bottom: 12 * spaceUnit,
  right: 16,
  zIndex: 1,
});

export const infoButtonWrapper = style({
  position: "absolute",
  bottom: 108,
  right: 16,
  zIndex: 1,
});

export const navigationControl = style({
  position: "absolute",
  top: 10,
  right: 16,
});
