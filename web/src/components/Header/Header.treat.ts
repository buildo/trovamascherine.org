import { style } from "treat";
import { primary, white } from "../../variables";

export const header = style({
  backgroundColor: primary,
  padding: "15px 140px",

  "@media": {
    "(max-width: 800px)": {
      padding: "15px 25px",
    },
  },
});

export const color = style({
  color: white,
});
