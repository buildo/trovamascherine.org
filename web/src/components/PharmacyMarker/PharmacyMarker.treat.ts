import { style } from "treat";

export const pharmacyPopup = style({
  position: "relative",
  cursor: "pointer !important",
});

export const pharmacyPopupContent = style({
  position: "relative",
  width: "100px",
  height: "100px",
});

export const pharmacyPopupRow = style({
  ":first-child": {
    marginBottom: "5px",
    borderBottom: "1px solid #ECEDF0",
  },
});

export const goodStatus = style({
  paddingLeft: "10px",
  ":first-child": {
    paddingRight: "10px",
    paddingLeft: "0 !important",
    borderRight: "1px solid #ECEDF0",
  },
  width: "25%",
});

export const roundedCornerColor = style({
  position: "absolute",
  zIndex: 0,
  borderRadius: "50px",
  borderRightColor: "transparent",
  borderTopColor: "transparent",
  borderBottomColor: "transparent",
  borderLeftColor: "transparent",
  borderWidth: "50px",
  borderStyle: "solid",
  height: "0px",
  width: "0px",
  transform: "rotate(45deg)",
});

export const whiteCircleContent = style({
  zIndex: 1,
  width: "80px",
  background: "white",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  position: "absolute",
  height: "80px",
  borderRadius: "50%",
});
