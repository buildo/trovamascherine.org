import React from "react";
import { Box } from "../Box/Box";
import GoodStatusDetail from "./GoodStatusDetail";
import * as classes from "./GoodStatusDetailBox.treat";

interface GoodStatus {
  good:
    | "Mascherina"
    | "Guanti"
    | "Gel"
    | "Termoscanner"
    | "Alchool"
    | "Pulsossimetro"
    | "Bomboleossigeno";
  quantity: number;
}

export function GoodStatusDetailBox(props: GoodStatus) {
  return (
    <Box width="50%" hAlignContent="center" className={classes.container}>
      <GoodStatusDetail good={props.good} quantity={props.quantity} />
    </Box>
  );
}

export default React.memo(GoodStatusDetailBox);
