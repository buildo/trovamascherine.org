import * as React from "react";
import { IconProps } from "./IconProps";

interface AlchoolIconProps extends IconProps {
  isActive?: boolean;
}

export function AlchoolIcon(props: AlchoolIconProps) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 45 45"
      className={props.className}
    >
      <g transform="translate(13.125 1.875)">
        <path
          d="M2630.444,64.8h.067V62.586a2.756,2.756,0,0,0-4.948,0V64.8h.053A11.45,11.45,0,0,1,2630.444,64.8Z"
          transform="translate(-2618.655 -61.045)"
          fill={props.isActive ? "#3e404d" : "#e7e7ea"}
        />
        <path
          d="M2639.127,66.875l-.276-.191a58.229,58.229,0,0,0-5.574-2.858c-.014-.005-.041-.009-.057-.016a10.888,10.888,0,0,0-4.549,0c-.014.007-.04.01-.052.016-.769.345-4.708,2.294-5.581,2.865l-.085.054c-.828.542-1.376.9-1.376,1.806v3.458a2.675,2.675,0,0,0,1.083,2.177c.323.236.634.42.883.569l.018.011c.927.551,1.207.716,1.207,2.046a2.647,2.647,0,0,1-.986,1.575,7.037,7.037,0,0,0-2.207,5.25V96.585a3.338,3.338,0,0,0,3.157,3.5h12.43a3.338,3.338,0,0,0,3.153-3.505V83.631a7.042,7.042,0,0,0-2.2-5.25,2.693,2.693,0,0,1-.993-1.575c0-1.323.281-1.491,1.2-2.046.271-.159.572-.338.911-.581A2.673,2.673,0,0,0,2640.316,72V68.544C2640.316,67.694,2639.993,67.472,2639.127,66.875Z"
          transform="translate(-2621.571 -58.835)"
          fill={props.isActive ? "#3e404d" : "#e7e7ea"}
        />
      </g>
      <rect
        width="15"
        height="7.5"
        transform="translate(15 28.125)"
        fill="#fff"
      />
    </svg>
  );
}
