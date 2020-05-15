import * as React from "react";
import { IconProps } from "./IconProps";

export function PhoneIcon(props: IconProps) {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24">
      <g transform="translate(0 0)">
        <path
          fill="currentColor"
          d="M20.977,17.57a.655.655,0,0,1-.193.456L18.918,19.89a3.763,3.763,0,0,1-2.766,1.085c-3.012,0-7-2.6-10.282-5.88A24.575,24.575,0,0,1,.833,8.17c-1.5-3.363-.7-5.182.236-6.113L2.95.192a.656.656,0,0,1,.928,0L8.152,4.479a.656.656,0,0,1,0,.928L6.683,6.882c-.4.4,0,1.386.206,1.793A12.455,12.455,0,0,0,9.237,11.8c2.232,2.232,4.339,3.12,4.916,2.553l1.468-1.468a.656.656,0,0,1,.928,0l4.235,4.225A.656.656,0,0,1,20.977,17.57Z"
          transform="translate(3.282 0) rotate(9)"
        />
      </g>
    </svg>
  );
}
