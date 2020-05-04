import { style, styleMap } from "treat";
import * as vars from "../../variables";
import { baseTextProps } from "./baseTextProps";

export const text = style({
  ...baseTextProps,
  fontWeight: vars.fontWeightNormal,
  color: vars.grey02,
});

export const textSizes = styleMap({
  1: {
    fontSize: "18px",
    lineHeight: "22px",
  },
  2: {
    fontSize: "16px",
    lineHeight: "20px",
  },
  3: {
    fontSize: "14px",
    lineHeight: "18px",
  },
  4: {
    fontSize: "12px",
    lineHeight: "16px",
  },
});

export type Size = keyof typeof textSizes;
