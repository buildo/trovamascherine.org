import * as React from "react";
import { useFormatMessage } from "../../intl";
import { Box } from "../Box/Box";
import { Subtitle } from "../Text/Subtitle";
import { Space } from "../Space/Space";
import { Button } from "../Button/Button";
import { none } from "fp-ts/lib/Option";
import { errorText } from "./GenericError.treat";
import { Footer } from "../Footer/Footer";

type Props = { retry: () => unknown };

export function GenericError(props: Props) {
  const formatMessage = useFormatMessage();
  return (
    <Box
      column
      width="100%"
      height="100%"
      vAlignContent="center"
      hAlignContent="center"
    >
      <Space grow />
      <Subtitle size={1} className={errorText}>
        {formatMessage("ErrorStatus.message")}
      </Subtitle>
      <Space units={10} />
      <Button
        variant="flat"
        action={props.retry}
        label={formatMessage("ErrorStatus.retry")}
        icon={none}
        size="small"
      />
      <Space grow />
      <Footer />
    </Box>
  );
}
