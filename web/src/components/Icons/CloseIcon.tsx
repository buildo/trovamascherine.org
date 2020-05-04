import * as React from "react";
import { IconProps } from "./IconProps";

export function CloseIcon(props: IconProps) {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24">
      <g fill="currentColor">
        <polygon points="19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12" />
      </g>
    </svg>
  );
}
