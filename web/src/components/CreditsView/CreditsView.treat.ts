import { style } from "treat";
import { white, backgrounGrey } from "../../variables";

const padding = {
  padding: "25px 140px",

  "@media": {
    "(max-width: 800px)": {
      padding: "25px",
    },
  },
};

export const contentTop = style({
  backgroundColor: white,
  ...padding,
});

export const contentBottom = style({
  backgroundColor: backgrounGrey,
  ...padding,
});
