import { style } from "treat";

export const map = style({
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

export const navigationControlWrapper = style({
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 1,
});

export const geolocateControlWrapper = style({
  marginTop: 10,
});

export const infoButtonWrapper = style({
  position: "absolute",
  top: 10,
  left: 10,
  zIndex: 1,
});
