import * as React from "react";
import { IconProps } from "./IconProps";
import png from "./wa.png";

export function WhatsAppIcon(props: IconProps) {
  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        backgroundImage: `url(${png})`,
        backgroundSize: "60% 60%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    ></div>
  );
}
