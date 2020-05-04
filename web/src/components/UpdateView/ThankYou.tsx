import * as React from "react";
import { Box } from "../Box/Box";
import { Title } from "../Text/Title";
import * as classes from "./UpdateView.treat";
import cx from "classnames";
import { FormattedMessage, useFormatMessage } from "../../intl";
import { Space } from "../Space/Space";
import { Values } from "./UpdateViewForm";
import { Button } from "../Button/Button";
import GoodStatusDetails from "../GoodStatusDetails";
import {
  pharmacyGoodListing,
  pharmacyGoodListingRow,
} from "../PharmacyModalContent/PharmacyModalContent.treat";
import { SupplierData } from "../../domain";
import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import { Address } from "./Address";
import { LastUpdate } from "./LastUpdate";
import { useIsMobile } from "../../useMatchMedia";

type Props = {
  supplier: O.Option<Omit<SupplierData, "supplies">>;
  values: Values;
  back: () => unknown;
};

export function ThankYou(props: Props) {
  const formatMessage = useFormatMessage();
  const isMobile = useIsMobile();
  return (
    <Box
      column
      hAlignContent="center"
      className={cx(classes.thankYou, { [classes.thankYouMobile]: isMobile })}
    >
      <Title size={2}>
        <FormattedMessage id="UpdateView.thankYou" />
      </Title>
      <Space units={10} />
      {pipe(
        props.supplier,
        O.chain(supplier => supplier.name),
        O.map(name => (
          <>
            <Title size={3}>{name}</Title>
            <Space units={4} />
          </>
        )),
        O.toNullable
      )}
      {pipe(
        props.supplier,
        O.map(supplier => <Address {...supplier} />),
        O.toNullable
      )}
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
      <Space units={10} />
      <Box>
        <Button
          variant="primary"
          action={props.back}
          label={formatMessage("ThankYou.back")}
          size="medium"
        />
      </Box>
    </Box>
  );
}
