import React from "react";
import { Box } from "../Box/Box";
import { Subtitle } from "../Text/Subtitle";
import { MaskIcon } from "../Icons/MaskIcon";
import { GelIcon } from "../Icons/GelIcon";
import { GlovesIcon } from "../Icons/GlovesIcon";
import { TermoScannerIcon } from "../Icons/TermoScannerIcon";
import * as classes from "./GoodStatusDetail.treat";
import { getColorFromBucket } from "../../util/ColorBucket";
import { useFormatMessage } from "../../intl";
import { Title } from "../Text/Title";
import { useIsMobile } from "../../useMatchMedia";
import { AlchoolIcon } from "../Icons/AlchoolIcon";
import { PulseMeterIcon } from "../Icons/ PulseMeterIcon";
import { OxigenCylinderIcon } from "../Icons/OxigenCylinderIcon";

interface GoodStatus {
  good:
    | "Mascherina"
    | "Guanti"
    | "Gel"
    | "Termoscanner"
    | "Alchool"
    | "Pulsossimetro"
    | "Bomboleossigeno";
  quantity: number;
}

type ArchProps = {
  color: string;
  width: number;
  height: number;
};

function Arch(props: ArchProps) {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 74.366 60.972">
      <path
        stroke={props.color}
        strokeWidth={5}
        fill="none"
        d="M63.528,62.871a34.683,34.683,0,1,1,53.315,0"
        transform="translate(-53.003 -3.501)"
      />
    </svg>
  );
}

function renderIconFromName(name: GoodStatus["good"]) {
  switch (name) {
    case "Mascherina":
      return MaskIcon;
    case "Guanti":
      return GlovesIcon;
    case "Gel":
      return GelIcon;
    case "Termoscanner":
      return TermoScannerIcon;
    case "Alchool":
      return AlchoolIcon;
    case "Pulsossimetro":
      return PulseMeterIcon;
    case "Bomboleossigeno":
      return OxigenCylinderIcon;
  }
}

function GoodStatusDetail(props: GoodStatus) {
  const Icon = renderIconFromName(props.good);
  const color = getColorFromBucket(props.good, props.quantity);
  const formatMessage = useFormatMessage();
  const label = ((): string => {
    switch (props.good) {
      case "Mascherina":
        return formatMessage("GoodStatusDetail.labelMascherina");
      case "Gel":
        return formatMessage("GoodStatusDetail.labelGel");
      case "Guanti":
        return formatMessage("GoodStatusDetail.labelGuanti");
      case "Termoscanner":
        return formatMessage("GoodStatusDetail.labelTermoscanner");
      case "Alchool":
        return formatMessage("GoodStatusDetail.labelAlchool");
      case "Pulsossimetro":
        return formatMessage("GoodStatusDetail.labelPulsossimetro");
      case "Bomboleossigeno":
        return formatMessage("GoodStatusDetail.labelBomboleossigeno");
    }
  })();
  const isMobile = useIsMobile();
  const iconSize = isMobile ? 36 : 70;
  const archWidth = isMobile ? 60 : 120;
  const archHeight = archWidth / 1.22;
  const iconVDisplacement = isMobile ? 12 : 20;
  const labelSize = isMobile ? 5 : 4;
  const titleSize = isMobile ? 5 : 4;

  return (
    <Box width="100%" column hAlignContent="center">
      <Box
        width={archWidth}
        height={archHeight}
        className={classes.iconContainer}
      >
        <Box
          width="100%"
          height="100%"
          vAlignContent="center"
          hAlignContent="center"
          className={classes.icon}
        >
          <Arch color={color} width={archWidth} height={archHeight} />
        </Box>
        <Box
          width="100%"
          height="100%"
          vAlignContent="center"
          hAlignContent="center"
          className={classes.icon}
          style={{ paddingTop: iconVDisplacement }}
        >
          <Icon
            width={iconSize}
            height={iconSize}
            isActive={props.quantity > 0}
          />
        </Box>
      </Box>
      <Box column hAlignContent="center">
        <Title size={titleSize}>
          {props.quantity > 0 ? props.quantity.toString() : "n.d."}
        </Title>
        <Subtitle size={labelSize} className={classes.goodName}>
          {label}
        </Subtitle>
      </Box>
    </Box>
  );
}

export default React.memo(GoodStatusDetail);
