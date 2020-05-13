import * as React from "react";
import { IconProps } from "./IconProps";

export function GeolocateIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      className={props.className}
      viewBox="0 0 26 26"
    >
      <g transform="translate(1 1)">
        <g
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth="2"
          transform="rotate(90 9.729 12.016)"
        >
          <circle cx="9.729" cy="9.729" r="9.729"></circle>
          <circle cx="9.729" cy="9.729" r="8.729"></circle>
        </g>
        <path
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth="2"
          d="M20.889 12H24M12 3.111V0m0 24v-3.111M0 12h3.111"
        ></path>
        <circle
          cx="3"
          cy="3"
          r="3"
          fill="#fff"
          transform="translate(9 9)"
        ></circle>
      </g>
    </svg>
  );
}
