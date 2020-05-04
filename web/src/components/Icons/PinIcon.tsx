import * as React from "react";
import { IconProps } from "./IconProps";

interface PinIconProps extends IconProps {
  fillColor?: string;
  strokeColor?: string;
}

export function PinIcon(props: PinIconProps) {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 20 34.9">
      <g transform="translate(-965.8 -331.8) scale(1.18559)">
        <path
          fill={props.fillColor || "#ff4646"}
          stroke={props.strokeColor || "#d73534"}
          d="M817.1 283a7.6 7.6 0 00-2 5.1c0 3.9 1.8 5.3 4.6 10.6a50.3 50.3 0 013.3 10l.4-1c1-4.1 2-6.6 3-8.9 2.8-5.3 4.5-6.7 4.6-10.6 0-1.8-.8-3.8-2-5.1a8.6 8.6 0 00-6-2.8 8 8 0 00-5.9 2.7z"
        ></path>
        <circle cx="823" cy="288.3" r="3" fill="#590000"></circle>
      </g>
    </svg>
  );
}
