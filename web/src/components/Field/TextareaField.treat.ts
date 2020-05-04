import { style } from "treat";
import { spaceUnit } from "../../variables";
import { baseInputProps, baseInputErrorProps } from "./baseFieldProps";

export const textarea = style({
  ...baseInputProps,
  padding: 3 * spaceUnit,
  resize: "none",
});

export const textareaError = style(baseInputErrorProps);
