import React from "react";
import { Box } from "../Box/Box";
import cx from "classnames";

import * as classes from "./GoodStatus.treat";
import { MaskIcon } from "../Icons/MaskIcon";
import { GelIcon } from "../Icons/GelIcon";
import { GlovesIcon } from "../Icons/GlovesIcon";
import { TermoScannerIcon } from "../Icons/TermoScannerIcon";

interface IGoodStatusProps {
  good: "Mascherina" | "Guanti" | "Gel" | "Termoscanner";
  quantity: number;
  showAmount?: boolean;
  className?: string;
}

function renderIconFromName(name: IGoodStatusProps["good"]) {
  switch (name) {
    case "Mascherina":
      return MaskIcon;
    case "Guanti":
      return GlovesIcon;
    case "Gel":
      return GelIcon;
    case "Termoscanner":
      return TermoScannerIcon;
  }
}

function GoodStatus(props: IGoodStatusProps) {
  const Icon = renderIconFromName(props.good);

  return (
    <Box className={cx(classes.GoodStatus, props.className)} column>
      <Box column hAlignContent="center">
        <Icon width={24} height={24} isActive={!!(props.quantity > 0)} />
        {props.showAmount && <Box>{props.quantity.toString()}</Box>}
      </Box>
    </Box>
  );
}

export default React.memo(GoodStatus);
