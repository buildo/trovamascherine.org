import React from "react";
import * as classes from "./OverlayButton.treat";

interface IOverlayButtonProps {
  children: JSX.Element;
  onClick: any;
}

export default function OverlayButton(props: IOverlayButtonProps) {
  return (
    <div className={classes.overlayButton} onClick={props.onClick}>
      {props.children}
    </div>
  );
}
