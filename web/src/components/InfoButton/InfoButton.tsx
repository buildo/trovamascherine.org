import React from "react";
import * as classes from "./InfoButton.treat";
import { InfoIcon } from "../Icons/InfoIcon";

interface IInfoButtonProps {
  onClick: any;
}

export default function InfoButton(props: IInfoButtonProps) {
  return (
    <div className={classes.infoButton} onClick={props.onClick}>
      <InfoIcon width={44} height={44} />
    </div>
  );
}
