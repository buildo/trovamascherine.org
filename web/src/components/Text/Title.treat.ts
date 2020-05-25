import { style, styleMap } from "treat";
import * as vars from "../../variables";
import { baseTextProps } from "./baseTextProps";

export const title = style({
  ...baseTextProps,
  wordWrap: "break-word",
});

export const titleSizes = styleMap({
  1: {
    fontSize: "48px",
    lineHeight: "52px",
    color: vars.grey01,
    fontWeight: vars.fontWeightNormal,
  },
  2: {
    fontSize: "36px",
    lineHeight: "40px",
    color: vars.grey01,
    fontWeight: vars.fontWeightNormal,
  },
  3: {
    fontSize: "24px",
    lineHeight: "28px",
    color: vars.grey01,
    fontWeight: vars.fontWeightMedium,
  },
  4: {
    fontSize: "20px",
    lineHeight: "24px",
    color: vars.grey02,
    fontWeight: vars.fontWeightMedium,
  },
  5: {
    fontSize: "18px",
    lineHeight: "24px",
    color: vars.grey02,
    fontWeight: vars.fontWeightMedium,
  },
  6: {
    fontSize: "15px",
    lineHeight: "22px",
    color: vars.grey02,
    fontWeight: vars.fontWeightMedium,
  },
});

export type Size = keyof typeof titleSizes;
