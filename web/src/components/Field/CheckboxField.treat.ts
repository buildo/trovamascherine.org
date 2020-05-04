import { style, styleMap } from "treat";
import { white, borderRadius, primary } from "../../variables";

export const checkbox = style({
  cursor: "pointer",
  outline: "none",
  border: `1px solid ${primary}`,
  borderRadius,
  width: "16px",
  height: "16px",
  marginTop: 2,
});

export const checked = styleMap({
  true: {
    background: primary,
    color: white,
  },
  false: {
    background: white,
  },
});

export const label = style({
  cursor: "pointer",
});
