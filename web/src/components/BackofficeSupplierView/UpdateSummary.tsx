import * as React from "react";
import { Box } from "../Box/Box";
import { Space } from "../Space/Space";
import { Values } from "./UpdateForm";
import { GoodStatusDetails } from "../GoodStatusDetails/GoodStatusDetails";
import * as O from "fp-ts/lib/Option";
import { LastUpdate } from "../SupplierInfo/LastUpdate";
import { right } from "fp-ts/lib/Either";

type Props = {
  values: Values;
};

export function UpdateSummary(props: Props) {
  return (
    <>
      <Box hAlignContent="center" column>
        <GoodStatusDetails
          mascherina={right({
            ffp: props.values.mascherineFFP,
            chirurgica: props.values.mascherineChirurgiche,
            lavabile: props.values.mascherineLavabili,
          })}
          gel={props.values.gel}
          glove={props.values.guanti}
          termoScanner={props.values.scanner}
          alchool={props.values.alchool}
          pulsossimetro={props.values.pulsossimetri}
          bomboleossigeno={props.values.bomboleossigeno}
        />
      </Box>
      <Space units={2} />
      <LastUpdate value={O.some(new Date())} fallbackMessage="" />
    </>
  );
}
