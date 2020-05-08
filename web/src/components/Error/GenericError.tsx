import * as React from "react";
import { useFormatMessage } from "../../intl";
import { Box } from "../Box/Box";
import { Subtitle } from "../Text/Subtitle";
import { Space } from "../Space/Space";
import { Button } from "../Button/Button";
import { none } from "fp-ts/lib/Option";
import { errorText } from "./GenericError.treat";
import { Footer } from "../Footer/Footer";
import { SupportEmailLink } from "../SupportEmailLink/SupportEmailLink";
import { Text } from "../Text/Text";

type Props = { retry: () => unknown; error: Error };

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
        {formatMessage("GenericError.message")}
      </Subtitle>
      <Space units={10} />
      <Button
        variant="flat"
        action={props.retry}
        label={formatMessage("GenericError.retry")}
        icon={none}
        size="small"
      />
      <Space units={10} />
      <Text size={2}>
        <SupportEmailLink
          label={formatMessage("GenericError.bugReportLinkLabel")}
          subject={formatMessage("GenericError.bugReportSubject")}
          body={formatMessage("GenericError.bugReportBody", {
            errorName: props.error.name,
            errorMessage: props.error.message,
          })}
        />
      </Text>
      <Space grow />
      <Footer />
    </Box>
  );
}
