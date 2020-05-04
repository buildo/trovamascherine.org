import { style } from "treat";
import {
  spaceUnit,
  grey04o50,
  white,
  black01,
  fontWeightBold,
} from "../../variables";

export const footer = style({
  padding: 3 * spaceUnit,
  backgroundColor: black01,

  "@media": {
    "(max-width: 800px)": {
      flexFlow: "column nowrap !important",
      alignItems: "center",
    },
  },
});

export const footerBox = style({
  padding: 4 * spaceUnit,
  borderRight: `1px solid ${grey04o50}`,
  color: white,

  ":last-child": {
    border: 0,
  },

  "@media": {
    "(max-width: 800px)": {
      width: "80%",
      borderRight: 0,
      borderBottom: `0.5px solid ${grey04o50}`,
      justifyContent: "center",
      alignItems: "center",

      ":first-child": {
        border: 0,
      },
    },
  },
});

export const footerBoxNoPaddingMobile = style({
  "@media": {
    "(max-width: 800px)": {
      marginBottom: "-30px",
    },
  },
});

export const footerTitle = style({
  fontWeight: fontWeightBold,

  "@media": {
    "(max-width: 800px)": {
      fontSize: "14px",
    },
  },
});

export const footerText = style({
  color: white,

  "@media": {
    "(max-width: 800px)": {
      textAlign: "center",
    },
  },
});

export const footerLink = style({
  color: white,
  fontWeight: fontWeightBold,
});

export const linksBox = style({
  "@media": {
    "(max-width: 800px)": {
      justifyContent: "space-around !important",
    },
  },
});
