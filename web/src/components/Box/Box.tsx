import * as React from "react";
import View from "react-flexview";
import { Children } from "../../util";

interface Props
  extends Omit<React.ComponentProps<typeof View>, "ref" | "children"> {
  children?: Children;
}

export const Box = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <View
      {...props}
      ref={ref}
      shrink={props.shrink || false}
      className={props.className}
    />
  );
});
