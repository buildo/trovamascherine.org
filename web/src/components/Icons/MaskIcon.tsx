import * as React from "react";
import { IconProps } from "./IconProps";

interface MaskIconProps extends IconProps {
  isActive?: boolean;
}

export function MaskIcon(props: MaskIconProps) {
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
        d="M19.4 11h-1.6V8.8h-.2a4.8 4.8 0 01-.5-.2l-.6-.2a1.6 1.6 0 01-.8-.5 4 4 0 01-.3-.5 1.4 1.4 0 00-.8-1 6.3 6.3 0 00-.7-.2 2.8 2.8 0 01-1-.4 1.5 1.5 0 01-.3-.2 3.3 3.3 0 00-2-.9 3.3 3.3 0 00-2 1 1.7 1.7 0 00-.2.1 2.8 2.8 0 01-1 .4l-.7.2a1.4 1.4 0 00-.9 1 2 2 0 01-.3.5 1.6 1.6 0 01-.7.5l-.6.2a4.8 4.8 0 01-.6.1l-.2.1V11H1.8v.7h1.6a5.8 5.8 0 002.4 3.8l.5.3a16.3 16.3 0 004.3 2v.1h.1a16.7 16.7 0 004.3-2l.4-.4a6 6 0 002.4-3.8h1.6zM7.3 8.5a4.7 4.7 0 01.6-.2 2 2 0 00.8-.4l.2-.2a2.7 2.7 0 011.7-1 3 3 0 011.7 1l.3.2a2 2 0 00.8.4 4.7 4.7 0 01.6.2.7.7 0 01.2.1l-.4.4-.6-.2a3 3 0 01-1-.5l-.3-.2c-.3-.3-.8-.8-1.3-.8a2.4 2.4 0 00-1.3.8l-.2.2a2.4 2.4 0 01-1 .5l-.6.2-.5-.4a1.7 1.7 0 01.3-.1zm3.5 5.9a1 1 0 01-.4 0l-3.9-1 .2-.5 3.7.9a1 1 0 00.4 0l3.8-1 .1.6zm3.8-2.8l-3.8-1a1 1 0 00-.4 0l-3.7 1-.2-.6 3.9-1a1 1 0 01.4 0l3.9 1z"
      ></path>
    </svg>
  );
}
