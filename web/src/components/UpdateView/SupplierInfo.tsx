import * as React from "react";
import { Box } from "../Box/Box";
import { Title } from "../Text/Title";
import { pipe } from "fp-ts/lib/pipeable";
import { getOrElse } from "fp-ts/lib/Option";
import { useFormatMessage } from "../../intl";
import { SupplierData } from "../../domain";
import { Address } from "./Address";
import { LastUpdate } from "./LastUpdate";
import { Space } from "../Space/Space";
import cx from "classnames";
import { useIsMobile } from "../../useMatchMedia";
import * as classes from "./SupplierInfo.treat";

type Props = Omit<SupplierData, "supplies">;

export function SupplierInfo(props: Props) {
  const formatMessage = useFormatMessage();
  const isMobile = useIsMobile();
  return (
    <Box
      column
      className={cx(classes.info, { [classes.infoMobile]: isMobile })}
    >
      <Title size={2}>
        {pipe(
          props.name,
          getOrElse(() => formatMessage("SupplierInfo.unknownSupplier"))
        )}
      </Title>
      <Address {...props} className={classes.address} />
      <Space units={4} />
      <LastUpdate
        value={props.lastUpdatedOn}
        fallbackMessage={formatMessage("SupplierInfo.firstUpdate")}
      />
    </Box>
  );
}
