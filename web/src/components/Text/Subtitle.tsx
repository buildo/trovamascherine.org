import * as React from "react";
import { CommonTextProps } from "./CommonTextProps";
import cx from "classnames";
import * as classes from "./Subtitle.treat";

type Props = CommonTextProps & {
  /**
   * Size variant of the subtitle
   */
  size: classes.Size;
};

export function Subtitle(props: Props) {
  return (
    <span
      id={props.id}
      className={cx(
        classes.subtitle,
        classes.subtitleSizes[props.size],
        props.className
      )}
      style={{ width: props.width }}
    >
      {props.children}
    </span>
  );
}
