import { Style } from "treat";
import { baseTextProps } from "../Text/baseTextProps";
import {
  borderRadius,
  white,
  grey06,
  fontWeightNormal,
  grey03,
  grey02,
  primary,
  grey04,
  grey07,
  grey09,
  red01,
} from "../../variables";

export const baseInputProps: Style = {
  ...baseTextProps,
  boxSizing: "border-box",
  width: "100%",
  borderRadius,
  backgroundColor: white,
  border: `1px solid ${grey06}`,
  fontWeight: fontWeightNormal,
  color: grey02,
  fontSize: "18px",
  lineHeight: "22px",

  ":hover": {
    borderColor: grey03,
  },

  ":focus": {
    outline: "none",
    borderColor: primary,
  },

  ":disabled": {
    color: grey04,
    borderColor: grey07,
    backgroundColor: grey09,
  },

  "::placeholder": {
    ...baseTextProps,
    fontWeight: fontWeightNormal,
    color: grey03,
    fontSize: "18px",
    lineHeight: "22px",
    height: "22px",
  },
};

export const baseInputErrorProps = {
  borderColor: red01,

  ":hover": {
    borderColor: red01,
  },

  ":focus": {
    borderColor: red01,
  },
};
