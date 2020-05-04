import * as React from "react";
import { CommonTextProps } from "./CommonTextProps";
import cx from "classnames";
import * as classes from "./Label.treat";

type Props = CommonTextProps & {
  size: classes.Size;
};

export function Label(props: Props) {
  return (
    <span
      id={props.id}
      className={cx(
        classes.label,
        classes.labelSizes[props.size],
        props.className
      )}
      style={{ width: props.width }}
    >
      {props.children}
    </span>
  );
}
