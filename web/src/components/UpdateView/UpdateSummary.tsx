import * as React from "react";
import { Box } from "../Box/Box";
import { Space } from "../Space/Space";
import { Values } from "./UpdateViewForm";
import GoodStatusDetails from "../GoodStatusDetails";
import {
  pharmacyGoodListing,
  pharmacyGoodListingRow,
} from "../PharmacyModalContent/PharmacyModalContent.treat";
import * as O from "fp-ts/lib/Option";
import { LastUpdate } from "./LastUpdate";

type Props = {
  values: Values;
};

export function UpdateSummary(props: Props) {
  return (
    <>
      <Box className={pharmacyGoodListing} hAlignContent="center" column>
        <Box className={pharmacyGoodListingRow}>
          <GoodStatusDetails
            good="Mascherina"
            quantity={props.values.mascherine}
          />
          <GoodStatusDetails good="Gel" quantity={props.values.gel} />
        </Box>
        <Box className={pharmacyGoodListingRow}>
          <GoodStatusDetails good="Guanti" quantity={props.values.guanti} />
          <GoodStatusDetails
            good="Termoscanner"
            quantity={props.values.scanner}
          />
        </Box>
      </Box>
      <Space units={10} />
      <LastUpdate value={O.some(new Date())} fallbackMessage="" />
    </>
  );
}
