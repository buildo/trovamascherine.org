import { style, styleMap } from "treat";
import * as vars from "../../variables";
import { baseTextProps } from "./baseTextProps";

export const subtitle = style({
  ...baseTextProps,
  fontWeight: vars.fontWeightNormal,
});

export const subtitleSizes = styleMap({
  1: {
    fontSize: "28px",
    lineHeight: "32px",
    color: vars.grey02,
  },
  2: {
    fontSize: "18px",
    lineHeight: "22px",
    color: vars.grey03,
  },
  3: {
    fontSize: "15px",
    lineHeight: "20px",
    color: vars.grey03,
  },
});

export type Size = keyof typeof subtitleSizes;
