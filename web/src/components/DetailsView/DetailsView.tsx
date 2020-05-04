import * as React from "react";
import { Box } from "../Box/Box";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { getSupplierData } from "../../API";
import { useAPI } from "../../useAPI";
import { pipe } from "fp-ts/lib/pipeable";
import { eq } from "fp-ts";
import { fold } from "../../RemoteData";

type Props = {
  supplierId: NonEmptyString;
};

export function DetailsView(props: Props) {
  const supplierData = useAPI(getSupplierData, props.supplierId, eq.eqString);
  return pipe(
    supplierData,
    fold(
      () => <Box>loading</Box>,
      () => <Box>error</Box>,
      data => (
        <Box>
          supplierId:{props.supplierId}, data:{JSON.stringify(data)}
        </Box>
      )
    )
  );
}
