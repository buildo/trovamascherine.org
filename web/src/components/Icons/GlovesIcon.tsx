import * as React from "react";
import { IconProps } from "./IconProps";

interface GlovesIconProps extends IconProps {
  isActive?: boolean;
}

export function GlovesIcon(props: GlovesIconProps) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 22 22"
      className={props.className}
    >
      <path fill="none" d="M0 0h22v22H0z"></path>
      <path
        fill={props.isActive ? "#3e404d" : "#e7e7ea"}
        d="M15.1 2.6a.8.8 0 01.4 1l-2.7 5.8L16.3 5a.8.8 0 01.9-.2.8.8 0 01.4 1 .7.7 0 010 .1l-3.2 4.5 2.7-1a.8.8 0 011 .6h.1a.9.9 0 01-.3 1l-6 3.8a1.4 1.4 0 00-.5.6l-1.6 3a1.2 1.2 0 01-1.3.7 8.4 8.4 0 01-3.8-2 1.2 1.2 0 01-.4-1.3L6 12.3l1.7-5a5.5 5.5 0 00.2-1l.5-3.2a.8.8 0 01.9-.7.7.7 0 01.2.1.8.8 0 01.4.8l-.3 4.4 1.6-5a.8.8 0 011-.5h.1a.8.8 0 01.4 1l-1.4 5.4 3-5.6a.8.8 0 011-.4z"
      ></path>
    </svg>
  );
}
