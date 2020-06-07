import React from "react";
import { Box } from "../Box/Box";
import cx from "classnames";
import { useFormatMessage, FormattedMessage } from "../../intl";
import { option } from "fp-ts";
import { Button } from "../Button/Button";
import { useCopyToClipboard } from "../../useCopyToClipboard";

import * as classes from "./ShareUrlBox.treat";

interface IShareUrlBoxProps {
  label: string;
  compactVersion?: boolean;
  className?: string;
}

export function ShareUrlBox(props: IShareUrlBoxProps) {
  const formatMessage = useFormatMessage();
  const [copy, copied] = useCopyToClipboard(props.label);

  return props.compactVersion ? (
    <Button
      variant="flat"
      size="medium"
      icon={option.none}
      label={
        copied
          ? formatMessage("SupplierInfo.copyUrlClicked")
          : formatMessage("SupplierInfo.copyUrlLong")
      }
      action={copy}
    />
  ) : (
    <Box column>
      <Box className={cx(classes.sharingLabel, props.className)}>
        <FormattedMessage id="SupplierInfo.sharePublicUrl" />
      </Box>
      <Box className={classes.fieldSet}>{props.label}</Box>
      <Box>
        <Button
          variant="flat"
          size="medium"
          icon={option.none}
          label={
            copied
              ? formatMessage("SupplierInfo.copyUrlClicked")
              : formatMessage("SupplierInfo.copyUrl")
          }
          action={copy}
        />
      </Box>
    </Box>
  );
}
