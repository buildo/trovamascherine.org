import { style, styleMap } from "treat";
import * as vars from "../../variables";

export const button = style({
  boxSizing: "border-box",
  cursor: "pointer",
  userSelect: "none",
  borderRadius: vars.borderRadius,
  display: "inline-block",
  textTransform: "uppercase",

  ":focus": {
    outline: "none",
  },
});

export const buttonDisabled = style({
  cursor: "default",
});

const padding = `0 ${4 * vars.spaceUnit}px`;

export const variants = styleMap({
  primary: {
    backgroundColor: vars.primary,
    color: vars.white,
    padding,

    ":hover": {
      backgroundColor: vars.primaryHover,
    },
  },
  secondary: {
    backgroundColor: vars.white,
    color: vars.grey04,
    border: `1px solid ${vars.grey03}`,
    padding,

    ":hover": {
      backgroundColor: vars.grey04o20,
      color: vars.grey02,
      border: `1px solid ${vars.grey04}`,
    },
  },
  destructive: {
    backgroundColor: vars.red01,
    color: vars.white,
    padding,

    ":hover": {
      backgroundColor: vars.red02,
    },
  },
  flat: {
    color: vars.grey04,
    padding: `0 ${vars.spaceUnit}px`,

    ":hover": {
      color: vars.grey02,
    },
  },
});

export const sizes = styleMap({
  small: {
    height: 8 * vars.spaceUnit,
  },
  medium: {
    height: 10 * vars.spaceUnit,
  },
  large: {
    height: 12 * vars.spaceUnit,
  },
});
