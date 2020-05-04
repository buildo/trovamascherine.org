import { style } from "treat";

export const GoodStatus = style({
  position: "relative",
  "@media": {
    "(min-width: 320px) and (max-width: 1024px)": {
      marginRight: "0 !important",
      width: "25%",
    },
  },

  ":first-child": {
    marginRight: 60,
  },
});

export const QuantityText = style({
  fontSize: "16px",
  fontWeight: "bold",
});

export const ArchWrapper = style({
  position: "absolute",
  top: -18,
  "@media": {
    "(min-width: 320px) and (max-width: 1024px)": {
      top: -7,
    },
  },
});

export const circleIcon = style({
  "@media": {
    "(min-width: 320px) and (max-width: 1024px)": {
      width: "70px",
      height: "70px",
    },
  },
});

export const goodIcon = style({
  "@media": {
    "(min-width: 320px) and (max-width: 1024px)": {
      width: "50px",
      height: "50px",
    },
  },
});

export const InfoTag = style({
  background: "white",
  zIndex: 9,
  width: "100%",
  paddingTop: 6,
  borderRadius: "26px",
});

export const goodName = style({
  paddingTop: "6px",
  color: "#3E404D",
  textAlign: "center",
});
