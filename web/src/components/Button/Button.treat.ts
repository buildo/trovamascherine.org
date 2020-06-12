import { style, styleMap } from "treat";
import * as vars from "../../variables";
import { heightSmall, heightMedium } from "./dimensions";

export const button = style({
  boxSizing: "border-box",
  cursor: "pointer",
  userSelect: "none",
  display: "inline-block",
  fontWeight: vars.fontWeightBold,
  boxShadow: vars.overlayBoxShadow,
  pointerEvents: "all",
  textAlign: "center",

  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  ":focus": {
    outline: "none",
  },
});

const paddingMedium = `0 ${6 * vars.spaceUnit}px`;
const paddingSmall = `0 ${4 * vars.spaceUnit}px`;

export const sizes = styleMap({
  small: {
    height: heightSmall,
    borderRadius: heightSmall / 2,
    fontSize: "13px",
    lineHeight: "19px",
    padding: paddingSmall,
  },
  medium: {
    height: heightMedium,
    borderRadius: heightMedium / 2,
    fontSize: "14px",
    lineHeight: "21px",
    padding: paddingMedium,
  },
});

export const buttonDisabled = style({
  cursor: "default",
});

export const variants = styleMap({
  primary: {
    backgroundColor: vars.primary,
    color: vars.white,

    "@media": {
      "(hover: hover)": {
        ":hover": {
          backgroundColor: vars.primaryHover,
        },
      },
    },
    ":active": {
      backgroundColor: vars.primaryHover,
    },
  },
  secondary: {
    backgroundColor: vars.white,
    color: vars.primary,

    "@media": {
      "(hover: hover)": {
        ":hover": {
          backgroundColor: vars.primaryHover2,
          color: vars.white,
        },
      },
    },
    ":active": {
      backgroundColor: vars.primaryHover2,
      color: vars.white,
    },
  },
  destructive: {
    backgroundColor: vars.red01,
    color: vars.white,

    "@media": {
      "(hover: hover)": {
        ":hover": {
          backgroundColor: vars.red02,
        },
      },
    },
    ":active": {
      backgroundColor: vars.red02,
    },
  },
  flat: {
    boxShadow: "none",
    textTransform: "uppercase",
    color: vars.primary,
    padding: `0 ${vars.spaceUnit}px`,

    "@media": {
      "(hover: hover)": {
        ":hover": {
          color: vars.primaryHover,
        },
      },
    },
    ":active": {
      color: vars.primaryHover,
    },
  },
  primaryIcon: {
    backgroundColor: vars.primary,
    color: vars.white,
    padding: 0,

    "@media": {
      "(hover: hover)": {
        ":hover": {
          backgroundColor: vars.primaryHover,
        },
      },
    },
    ":active": {
      backgroundColor: vars.primaryHover,
    },
  },
  secondaryIcon: {
    backgroundColor: vars.white,
    color: vars.primary,
    padding: 0,

    "@media": {
      "(hover: hover)": {
        ":hover": {
          backgroundColor: vars.primaryHover2,
          color: vars.white,
        },
      },
    },
    ":active": {
      backgroundColor: vars.primaryHover2,
      color: vars.primary,
    },
  },
});

export const disabled = style({
  pointerEvents: "none",
  boxShadow: "none",
});

export const disabledVariants = styleMap({
  primary: {
    backgroundColor: vars.grey03,
    color: vars.white,
  },
  secondary: {},
  destructive: {},
  flat: {},
  primaryIcon: {},
  secondaryIcon: {},
});
