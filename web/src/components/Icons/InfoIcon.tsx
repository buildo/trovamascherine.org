import * as React from "react";
import { IconProps } from "./IconProps";

export function InfoIcon(props: IconProps) {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 44 44">
      <rect
        fill="none"
        width={props.width}
        height={props.height}
        rx={props.width / 2}
      />
      <g transform="translate(455 -2151)">
        <path
          fill="currentColor"
          d="M14.744,19.13a4.256,4.256,0,0,1-1.187.223.8.8,0,0,1-.464-.095c-.192-.14-.549-.4.062-1.68L14.3,15.186a4.56,4.56,0,0,0,.28-3.87,3.044,3.044,0,0,0-2.194-1.7A5.168,5.168,0,0,0,11.288,9.5a5.665,5.665,0,0,0-3.6,1.351.623.623,0,0,0-.051.847.554.554,0,0,0,.615.17,4.226,4.226,0,0,1,1.187-.224.792.792,0,0,1,.459.094c.193.142.551.408-.058,1.682L8.7,15.814a4.556,4.556,0,0,0-.28,3.87,3.042,3.042,0,0,0,2.2,1.7,5.311,5.311,0,0,0,1.09.116,5.671,5.671,0,0,0,3.6-1.351.623.623,0,0,0,.053-.847A.555.555,0,0,0,14.744,19.13Z"
          transform="translate(-445.5 2161.33)"
        />
        <circle
          fill="currentColor"
          cx="3"
          cy="3"
          r="3"
          transform="translate(-434 2163)"
        />
      </g>
    </svg>
  );
}
