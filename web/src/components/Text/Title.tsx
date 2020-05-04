import * as React from "react";
import { CommonTextProps } from "./CommonTextProps";
import cx from "classnames";
import * as classes from "./Title.treat";

type Props = CommonTextProps & {
  /**
   * Size variant of the title
   */
  size: classes.Size;
};

export function Title(props: Props) {
  return (
    <span
      id={props.id}
      className={cx(
        classes.title,
        classes.titleSizes[props.size],
        props.className
      )}
      style={{ width: props.width }}
    >
      {props.children}
    </span>
  );
}
