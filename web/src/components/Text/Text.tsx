import * as React from "react";
import { CommonTextProps } from "./CommonTextProps";
import cx from "classnames";
import * as classes from "./Text.treat";

type Props = CommonTextProps & {
  /**
   * Size variant of the text
   */
  size: classes.Size;
};

export function Text(props: Props) {
  return (
    <span
      id={props.id}
      className={cx(
        classes.text,
        classes.textSizes[props.size],
        props.className
      )}
      style={{ width: props.width }}
    >
      {props.children}
    </span>
  );
}
