import { style, styleMap } from "treat";
import * as vars from "../../variables";
import { baseTextProps } from "./baseTextProps";

export const label = style({
  ...baseTextProps,
  fontWeight: vars.fontWeightNormal,
  color: vars.grey02,
});

export const labelSizes = styleMap({
  1: {
    fontSize: "15px",
    lineHeight: "20px",
    textTransform: "uppercase",
  },
  2: {
    fontSize: "13px",
    lineHeight: "18px",
  },
});

export type Size = keyof typeof labelSizes;
