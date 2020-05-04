import * as React from "react";
import { Children, CommonProps } from "../../util";
import { Box } from "../Box/Box";
import cx from "classnames";
import * as classes from "./Button.treat";
import * as O from "fp-ts/lib/Option";
import { Option } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { Space } from "../Space/Space";
import { fromKeyCodeFilter, keyCodes } from "../keyCodes";

/**
 * Size of the button
 */
type Size = "small" | "medium" | "large";

type FlatVariant = {
  /**
   * Alternative variation for secondary actions
   */
  variant: "flat";
  /**
   * An optional icon displayed on the left of the flat button label
   */
  icon: Option<Children>;
};

type Variant =
  | {
      /**
       * Use to indicate primary actions. Avoid providing more than a single primary action in any given context
       */
      variant: "primary";
    }
  | {
      /**
       * Use to indicate secondary actions
       */
      variant: "secondary";
    }
  | {
      /**
       * Use to indicate destructive actions
       */
      variant: "destructive";
    }
  | FlatVariant;

function isFlatVariant(props: Variant): props is FlatVariant {
  return props.variant === "flat";
}

type Props = CommonProps &
  Variant & {
    /**
     * Size of the button: `"small" | "medium" | "large"`
     *
     */
    size: Size;
    /**
     * Label representing the action that is displayed by the button
     */
    label: string;
    /**
     * Function executed when the action is triggered,
     * either by clicking the button or by pressing the enter key while the button is focused
     */
    action: () => unknown;
  };

export const Button = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <Box
      vAlignContent="center"
      hAlignContent="center"
      id={props.id}
      ref={ref}
      role="button"
      tabIndex={0}
      className={cx(
        classes.button,
        props.className,
        classes.variants[props.variant],
        classes.sizes[props.size]
      )}
      onClick={props.action}
      onKeyDown={fromKeyCodeFilter(keyCodes.Enter, props.action)}
      width={props.width}
    >
      {pipe(
        O.some(props),
        O.filter(isFlatVariant),
        O.chain(props => props.icon),
        O.map(icon => (
          <>
            <Box>{icon}</Box>
            <Space units={2} />
          </>
        )),
        O.toNullable
      )}
      <Box>{props.label}</Box>
    </Box>
  );
});
