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

type MainVariant = {
  /**
   * Use to indicate primary, secondary or destructive actions.
   */
  variant: "primary" | "secondary" | "destructive" | "flat";
  /**
   * Label representing the action that is displayed by the button
   */
  label: string;
  /**
   * Optional icon
   */
  icon: Option<Children>;
};

type IconVariant = {
  /**
   * Icon button, primary or secondary
   */
  variant: "primaryIcon" | "secondaryIcon";
  /**
   * An icon displayed on the left of the button label
   */
  icon: Children;
};

type Variant = MainVariant | IconVariant;

function isMainVariant(props: Variant): props is MainVariant {
  return ["primary", "secondary", "destructive", "flat"].includes(
    props.variant
  );
}

type Size = {
  /** Size variant */
  size: "small" | "medium";
};

type Props = CommonProps &
  Variant &
  Size & {
    /**
     * Function executed when the action is triggered,
     * either by clicking the button or by pressing the enter key while the button is focused
     */
    action: () => unknown;
    /**
     * Whether the buttons hould be disabled
     */
    disabled?: boolean;
  };

function content(props: Props): Children {
  switch (props.variant) {
    case "primary":
    case "secondary":
    case "destructive":
    case "flat":
      return props.label;
    case "primaryIcon":
    case "secondaryIcon":
      return props.icon;
  }
}

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
        classes.sizes[props.size],
        {
          [classes.disabled]: props.disabled,
          [classes.disabledVariants[props.variant]]: props.disabled,
        }
      )}
      onClick={e => {
        e.stopPropagation();
        if (!props.disabled) {
          props.action();
        }
      }}
      onKeyDown={fromKeyCodeFilter(keyCodes.Enter, props.action)}
      width={props.width}
    >
      {pipe(
        O.some(props),
        O.filter(isMainVariant),
        O.chain(props => props.icon),
        O.map(icon => (
          <>
            <Box>{icon}</Box>
            <Space units={2} />
          </>
        )),
        O.toNullable
      )}
      <Box>{content(props)}</Box>
    </Box>
  );
});
