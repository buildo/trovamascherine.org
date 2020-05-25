import { style } from "treat";
import { overlayBoxShadow } from "../../variables";
import { heightMedium } from "./dimensions";

export const toggleButtonGroup = style({
  boxShadow: overlayBoxShadow,
  borderRadius: heightMedium,
});

export const toggleButtonGroupItem = style({
  boxShadow: "none !important",
});

export const first = style({
  borderTopRightRadius: `0 !important`,
  borderBottomRightRadius: `0 !important`,
});

export const last = style({
  borderTopLeftRadius: `0 !important`,
  borderBottomLeftRadius: `0 !important`,
});

export const middle = style({
  borderRadius: `0 !important`,
});
