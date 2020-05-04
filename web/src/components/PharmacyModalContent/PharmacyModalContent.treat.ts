import { style } from "treat";

export const pharmacyModalContent = style({
  height: "100%",
  padding: "10px",
});

export const pharmacyName = style({
  fontSize: "18px",
  marginBottom: "10px",
});

export const pharmacyModalContentAddress = style({
  fontSize: "12px",
});

export const pharmacyGoodListing = style({
  width: "100%",
  paddingTop: "40px",
  "@media": {
    "(min-width: 320px) and (max-width: 1024px)": {
      paddingTop: 30,
    },
  },
});

export const pharmacyGoodListingRow = style({
  "@media": {
    "(min-width: 320px) and (max-width: 1024px)": {
      width: "100%",
      justifyContent: "space-evenly",
      ":first-child": {
        marginBottom: 30,
      },
    },
  },
  ":first-child": {
    marginBottom: "30px",
  },
});
