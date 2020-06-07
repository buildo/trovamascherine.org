import * as React from "react";
import { Children } from "../../util";
import { Box } from "../Box/Box";
import { Title } from "../Text/Title";
import { header, color } from "./Header.treat";
import { HeaderLogo } from "../Icons/HeaderLogo";

type Props = {
  children?: Children;
};

export function Header(props: Props) {
  return (
    <Box width="100%" className={header}>
      <Title size={2} className={color}>
        <HeaderLogo width={254} height={40} />
        {props.children}
      </Title>
    </Box>
  );
}
