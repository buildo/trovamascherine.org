import { style } from "treat";

export const marker = style({
  display: "flex",
  flexDirection: "column",
  width: "8px",
  height: "8px",
  borderRadius: "4px",
  backgroundColor: "#44b6ff",
});

export const markerWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export const markerRing = style({
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  backgroundColor: "rgba(68, 182, 255, .15)",
  position: "absolute",
});
