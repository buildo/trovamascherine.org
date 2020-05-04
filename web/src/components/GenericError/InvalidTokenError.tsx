import * as React from "react";
import { useFormatMessage } from "../../intl";
import { Box } from "../Box/Box";
import { Subtitle } from "../Text/Subtitle";
import { Space } from "../Space/Space";
import { errorText, errorBox } from "./GenericError.treat";
import { Footer } from "../Footer/Footer";
import { Text } from "../Text/Text";

export function InvalidTokenError() {
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
      <Box column hAlignContent="center" className={errorBox}>
        <Subtitle size={1} className={errorText}>
          {formatMessage("InvalidTokenError.message")}
        </Subtitle>
        <Space units={10} />
        <Text size={2}>{formatMessage("InvalidTokenError.description1")}</Text>
        <Text size={2}>{formatMessage("InvalidTokenError.description2")}</Text>
      </Box>
      <Space grow />
      <Footer />
    </Box>
  );
}
