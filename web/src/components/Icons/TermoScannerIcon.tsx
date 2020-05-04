import * as React from "react";
import { IconProps } from "./IconProps";

interface TermoScannerIconProps extends IconProps {
  isActive?: boolean;
}

export function TermoScannerIcon(props: TermoScannerIconProps) {
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
        stroke={props.isActive ? "#3e404d" : "#e7e7ea"}
        strokeWidth="0.8"
        d="M13.6 5H7.3a.2.2 0 00-.2.2l-.7 1.2L5 8.8l-.6 1.1a.5.5 0 000 .5l.2.8.1.3a3.2 3.2 0 00-.1.4l-1.2 3.6-.9 2.8v.4a.3.3 0 000 .3 2.8 2.8 0 001.2.6 4.2 4.2 0 002 0 2 2 0 00.2-.1.2.2 0 00.1-.3l-.2-.5v-.3a17.2 17.2 0 002.9-7V11a1.5 1.5 0 011.1-.9l1.3-.2h0l1.5-.3a.5.5 0 00.4-.4l.9-3.7a.4.4 0 00-.4-.5z"
      ></path>
      <path
        fill={props.isActive ? "#3e404d" : "#e7e7ea"}
        d="M16.2 5a.5.5 0 10-1 .3 4.2 4.2 0 01-.9 4.5.5.5 0 00.7.7A5.1 5.1 0 0016.2 5z"
      ></path>
      <path
        fill={props.isActive ? "#3e404d" : "#e7e7ea"}
        d="M18.1 4.1a.5.5 0 00-.8.4 6.1 6.1 0 01-1.5 6.8.5.5 0 00.6.7 7 7 0 001.7-7.9z"
      ></path>
      <path
        fill={props.isActive ? "#3e404d" : "#e7e7ea"}
        d="M20.2 3.3a.5.5 0 00-.9.4 8 8 0 01-2 9 .5.5 0 10.6.8 8.9 8.9 0 002.3-10.2z"
      ></path>
    </svg>
  );
}
