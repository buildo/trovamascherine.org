import React from "react";
import { Box } from "../Box/Box";
import cx from "classnames";

import { Subtitle } from "../Text/Subtitle";

import * as classes from "./GoodStatusDetails.treat";
import { MaskIcon } from "../Icons/MaskIcon";
import { GelIcon } from "../Icons/GelIcon";
import { GlovesIcon } from "../Icons/GlovesIcon";
import { TermoScannerIcon } from "../Icons/TermoScannerIcon";
import { getColorFromBucket } from "../../util/ColorBucket";
import { useFormatMessage } from "../../intl";

interface IGoodStatusProps {
  good: "Mascherina" | "Guanti" | "Gel" | "Termoscanner";
  quantity: number;
  className?: string;
}

type CircleIcon = {
  color?: string;
};

function CircleIcon(props: CircleIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="140px"
      height="140px"
      version="1"
      className={classes.circleIcon}
      viewBox="0 0 1280 1280"
    >
      <path
        fill={props.color}
        d="M626.9 10.7a627 627 0 00-333.4 103.8A628.9 628.9 0 0032 476.8 602.7 602.7 0 0011 640c0 39.8 2.1 66.8 8.1 103.3A629.3 629.3 0 00573 1265.9c41.4 4.5 95.3 4.3 138.5-.5a629.3 629.3 0 00413.2-223.9A627 627 0 001265.5 569a630.3 630.3 0 00-379-508.3 628.6 628.6 0 00-259.6-50zm41.4 20c-2.3.2-6.4.2-9 0-2.6-.2-.7-.3 4.2-.3 5 0 7.1.1 4.8.3zm17.5 1a30 30 0 01-6 0c-1.8-.2-.6-.4 2.7-.4 3.3 0 4.8.2 3.3.4zm8.5 1c-.7.2-1.9.2-2.5 0-.7-.3-.2-.5 1.2-.5s1.9.2 1.3.5zM384.6 85.6c.1.5-7.3 4.6-16.6 9.1-11.9 5.8-16.7 7.7-16.6 6.6.3-1.6 30.2-17.4 32-16.9.6.1 1.1.6 1.2 1.2zM690 99.5a541.2 541.2 0 01303.5 128.6c15.4 13.2 45.2 43 58.4 58.4A541.6 541.6 0 011176.4 557c4.6 30 6 49 6 83s-1.4 52.8-6 83a543.2 543.2 0 01-124.5 270.5 731.4 731.4 0 01-58.4 58.4A543.2 543.2 0 01723 1176.4c-30.2 4.6-49 6-83 6s-53-1.4-83-6a541.6 541.6 0 01-270.5-124.5 731.4 731.4 0 01-58.4-58.4A541.2 541.2 0 0199.4 689a667.8 667.8 0 010-98 541.2 541.2 0 01126-301.5 745.7 745.7 0 0164.1-64.1A543.8 543.8 0 01615 97.6c14.8-.7 58.8.4 75 1.9zm-340.8 3.9c.7-.4.8-.2.4.4-1.1 1.8-2.6 1.4-2.5-.6 0-1 .3-1.2.6-.4.2.6 1 .9 1.5.6zM960 120.6c0 .2-.9 0-2-.6s-2-1.3-2-1.6c0-.2.9 0 2 .6s2 1.3 2 1.6zm8 5c0 .2-.9 0-2-.6s-2-1.3-2-1.6c0-.2.9 0 2 .6s2 1.3 2 1.6zm22 15c0 .3-1.3-.4-3-1.6-1.6-1.2-3-2.4-3-2.6 0-.3 1.4.4 3 1.6 1.7 1.2 3 2.4 3 2.6zM141 290.4c0 .2-.8 1-1.7 1.7-1.6 1.3-1.7 1.2-.4-.4 1.3-1.6 2.1-2.1 2.1-1.3zM125 314c-.6 1.1-1.3 2-1.6 2-.2 0 0-.9.6-2s1.3-2 1.6-2c.2 0 0 .9-.6 2zm1051.4 34.6c.3.8.2 1.2-.4.9-.6-.3-1-1-1-1.6 0-1.4.7-1.1 1.4.7zm9.7 18.5a84.3 84.3 0 014.7 10.5c-.2.2-2.7-4.4-5.6-10.1-2.8-5.8-5-10.5-4.7-10.5a71 71 0 015.6 10.1zM32.7 587.7c-.3 1-.5.2-.5-1.7s.2-2.7.5-1.8c.2 1 .2 2.6 0 3.5zm-1 12.5c-.2 1.8-.4.6-.4-2.7 0-3.3.2-4.8.4-3.3a30 30 0 010 6zm-1 21.1c-.2 2.3-.3.1-.3-4.8 0-5 .1-6.8.3-4.2.2 2.6.2 6.7 0 9zm1219 47.9c-.2 2.9-.3.8-.3-4.7s.1-7.9.3-5.3c.2 2.6.2 7.1 0 10zm1 12.5c-.2 1.6-.4.5-.4-2.2 0-2.8.2-4 .4-2.8.2 1.3.2 3.5 0 5zm-1.4 4.8c.4 6.8.3 8.7-.3 6a56.3 56.3 0 01-.6-16.4c.2.2.6 4.9.9 10.4zm0 10.7c.8.5.6.8-.5.8-1.4 0-1.8-.8-1.7-3.8.2-3.4.2-3.4.6-.7.3 1.6 1 3.3 1.6 3.7zM94.9 912.7a68.4 68.4 0 014.6 10.3C99 923 89 903.4 89 902.4c0-1.3.7 0 5.9 10.3zm9.9 19.8c-.3.3-.9-.2-1.2-1.2-.6-1.4-.5-1.5.5-.6.7.7 1 1.5.7 1.8zM1144 984.4c0 .2-.8 1-1.7 1.7-1.6 1.3-1.7 1.2-.4-.4 1.3-1.6 2.1-2.1 2.1-1.3zm-851.9 156.3c1.3 1.6 1.2 1.7-.3.4-1.7-1.3-2.2-2.1-1.4-2.1.2 0 1 .8 1.7 1.7zm23.9 15.9c0 .2-.9 0-2-.6s-2-1.3-2-1.6c0-.2.9 0 2 .6s2 1.3 2 1.6zm8 5c0 .2-.9 0-2-.6s-2-1.3-2-1.6c0-.2.9 0 2 .6s2 1.3 2 1.6zm597 19.9c0 .6-17.7 9.5-18.7 9.4-.6 0 17.4-9.6 18.5-9.8.1-.1.2.1.2.4zm-332.7 66.2c-.7.2-1.9.2-2.5 0-.7-.3-.2-.5 1.2-.5s1.9.2 1.3.5zm12.5 1a30 30 0 01-6 0c-1.8-.2-.6-.4 2.7-.4 3.3 0 4.8.2 3.3.4zm20.5 1c-2.3.2-6.4.2-9 0-2.6-.2-.7-.3 4.2-.3 5 0 7.1.1 4.8.3z"
      ></path>
      <path
        fill={props.color}
        d="M359 97c-4.1 2.1-7.2 3.9-6.7 4a92 92 0 0014.7-7.5c0-.7.3-.8-8 3.5z"
      ></path>
    </svg>
  );
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

function GoodStatusDetails(props: IGoodStatusProps) {
  const Icon = renderIconFromName(props.good);

  const color = getColorFromBucket(props);

  const formatMessage = useFormatMessage();
  const label = ((): string => {
    switch (props.good) {
      case "Mascherina":
        return formatMessage("GoodStatusDetails.labelMascherina");
      case "Gel":
        return formatMessage("GoodStatusDetails.labelGel");
      case "Guanti":
        return formatMessage("GoodStatusDetails.labelGuanti");
      case "Termoscanner":
        return formatMessage("GoodStatusDetails.labelTermoscanner");
    }
  })();

  return (
    <Box className={cx(classes.GoodStatus, props.className)} column>
      <Box column hAlignContent="center">
        <Box className={classes.ArchWrapper}>
          <CircleIcon color={color} />
        </Box>
        <Icon
          width={100}
          height={100}
          className={classes.goodIcon}
          isActive={!!(props.quantity > 0)}
        />
        <Box className={classes.InfoTag} column hAlignContent="center">
          <Box className={classes.QuantityText}>
            {props.quantity > 0 ? props.quantity.toString() : "n.d."}
          </Box>
          <Subtitle size={3} className={classes.goodName}>
            {label}
          </Subtitle>
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(GoodStatusDetails);
