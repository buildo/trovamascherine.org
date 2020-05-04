import * as React from "react";
import { useFormatMessage } from "../../intl";
import { Box } from "../Box/Box";
import { Subtitle } from "../Text/Subtitle";

export function Loading() {
  const formatMessage = useFormatMessage();
  return (
    <Box
      column
      width="100%"
      height="100%"
      vAlignContent="center"
      hAlignContent="center"
    >
      <Subtitle size={1}>{formatMessage("Loading.message")}</Subtitle>
    </Box>
  );
}
