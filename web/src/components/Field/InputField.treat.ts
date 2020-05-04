import { style } from "treat";
import { spaceUnit } from "../../variables";
import { baseInputProps, baseInputErrorProps } from "./baseFieldProps";

export const input = style({
  ...baseInputProps,
  paddingLeft: 3 * spaceUnit,
  height: 12 * spaceUnit,
  paddingTop: 3 * spaceUnit,
  paddingBottom: 3 * spaceUnit,
});

export const inputError = style(baseInputErrorProps);

export const rightContentRightMargin = style({
  marginRight: 3 * spaceUnit,
});

export const rightContentLeftMargin = style({
  marginLeft: 3 * spaceUnit,
});
