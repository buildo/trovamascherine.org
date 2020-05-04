import * as React from "react";
import { IconProps } from "./IconProps";

interface GelIconProps extends IconProps {
  isActive?: boolean;
}

export function GelIcon(props: GelIconProps) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 22 22"
      className={props.className}
    >
      <path
        d="M8.6 3.5h4.3a.7.7 0 00.7-.6v-.3A.7.7 0 0013 2H8.6a.7.7 0 00-.7.6V3a.7.7 0 00.7.6z"
        fill={props.isActive ? "#3e404d" : "#e7e7ea"}
      ></path>
      <path
        d="M15.9 6.5l-3-1V3.7a.7.7 0 00-.6-.6h-3a.7.7 0 00-.8.6v1.8l-2.9 1a.7.7 0 00-.4.6v10.1a1.3 1.3 0 001.4 1.3H15a1.3 1.3 0 001.4-1.3v-10a.7.7 0 00-.4-.7zm-2.3 5.7a.3.3 0 01-.3.3h-1.7v1.6a.3.3 0 01-.4.3h-1a.3.3 0 01-.3-.3v-1.6H8.2a.3.3 0 01-.3-.3v-.9a.3.3 0 01.3-.3H10V9.4a.3.3 0 01.4-.3h1a.3.3 0 01.3.3V11h1.7a.3.3 0 01.3.3z"
        fill={props.isActive ? "#3e404d" : "#e7e7ea"}
      ></path>
      <path fill="none" d="M0 0h22v22H0z"></path>
    </svg>
  );
}
