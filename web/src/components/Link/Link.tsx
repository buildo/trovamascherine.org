import * as React from "react";
import cx from "classnames";

import { link } from "./Link.treat";

export function Link(props: React.AllHTMLAttributes<HTMLAnchorElement>) {
  const onClick = props.onClick;
  return (
    <a
      {...props}
      className={cx(link, props.className)}
      onClick={e => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
    >
      {props.children}
    </a>
  );
}
