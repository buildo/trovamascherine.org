import * as React from "react";
import { Children } from "../../util";
import { Box } from "../Box/Box";
import { Title } from "../Text/Title";
import { header, color } from "./Header.treat";
import { useFormatMessage } from "../../intl";

type Props = {
  children?: Children;
};

export function Header(props: Props) {
  const formatMessage = useFormatMessage();
  return (
    <Box width="100%" className={header}>
      <Title size={2} className={color}>
        {props.children || formatMessage("Header.title")}
      </Title>
    </Box>
  );
}
