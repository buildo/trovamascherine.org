import * as React from "react";
import { Box } from "../Box/Box";
import { Title } from "../Text/Title";
import { pipe } from "fp-ts/lib/pipeable";
import { getOrElse, some, Option, map, toNullable } from "fp-ts/lib/Option";
import { useFormatMessage } from "../../intl";
import { Supplier } from "../../domain";
import { Address } from "./Address";
import { LastUpdate } from "./LastUpdate";
import { Space } from "../Space/Space";
import { useIsMobile } from "../../useMatchMedia";
import * as classes from "./SupplierInfo.treat";
import { Button } from "../Button/Button";
import { ShareUrlBox } from "../ShareUrlBox/ShareUrlBox";
import { SettingsIcon } from "../Icons/SettingsIcon";

type Props = Omit<Supplier, "supplies" | "config"> & {
  onEditSettings: Option<() => unknown>;
};

export function SupplierInfo(props: Props) {
  const formatMessage = useFormatMessage();
  const isMobile = useIsMobile();
  const link = `${window.location.host}/?latitude=${props.data.latitude}&longitude=${props.data.longitude}&zoom=17&supplier=${props.data.id}`;
  return (
    <Box column className={classes.info} width={!isMobile ? 400 : undefined}>
      <Title size={3}>
        {pipe(
          props.data.name,
          getOrElse(() => formatMessage("SupplierInfo.unknownSupplier"))
        )}
      </Title>
      <Address {...props.data} dark />
      <Space units={4} />
      <LastUpdate
        value={props.lastUpdatedOn}
        fallbackMessage={formatMessage("SupplierInfo.firstUpdate")}
      />
      <Space units={2} />
      {pipe(
        props.onEditSettings,
        map(onClick => (
          <>
            <Box>
              <Button
                variant="flat"
                size="medium"
                icon={some(<SettingsIcon width={24} height={24} />)}
                label={formatMessage("SupplierInfo.editSettings")}
                action={onClick}
              />
            </Box>
            <Space units={isMobile ? 2 : 20} />
            <ShareUrlBox label={link} />
          </>
        )),
        toNullable
      )}
    </Box>
  );
}
