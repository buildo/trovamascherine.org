import * as React from "react";
import InputChildren from "react-input-children";
import { CommonProps, Children } from "../../util";
import { Option } from "fp-ts/lib/Option";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { constUndefined } from "fp-ts/lib/function";
import { Box } from "../Box/Box";
import { FieldMessage } from "./FieldMessage";
import { Space } from "../Space/Space";
import * as classes from "./InputField.treat";
import cx from "classnames";
import { useUniqueID } from "./useUniqueID";
import { Label } from "../Text/Label";

type Props = CommonProps & {
  /**
   * Type of the underlying input element
   */
  type: "text" | "email" | "password" | "number";
  /**
   * Content to display to the right end of the input area
   */
  rightContent: Option<Children>;
  /**
   * Current input value
   */
  value: string;
  /**
   * Function called when the user changes the input content
   */
  onChange: (value: string) => unknown;
  /**
   * Input label. Should be a very short description
   */
  label: Children;
  /**
   * Placeholder displayed inside the input when empty
   */
  placeholder: string;
  /**
   * Optional error associated with the input, typically related to the current value
   */
  error: Option<string>;
  /**
   * Whether the input should be disabled
   */
  disabled?: boolean;
  /**
   * Whether to automatically focus the input upon first render.
   * Only a single input element in a given view should have this prop set to true,
   * otherwise the last rendered one obtains the focus.
   */
  autoFocus?: boolean;
};

export const InputField = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const labelID = useUniqueID();
    return (
      <Box
        width={props.width || "345px"}
        column
        id={props.id}
        className={props.className}
      >
        <Label size={1} id={labelID}>
          {props.label}
        </Label>
        <Space units={2} />
        <InputChildren
          className={cx(
            classes.input,
            pipe(
              props.error,
              O.fold(constUndefined, () => classes.inputError)
            )
          )}
          type={props.type}
          value={props.value}
          onChange={e => props.onChange(e.currentTarget.value)}
          placeholder={props.placeholder}
          autoFocus={props.autoFocus}
          disabled={props.disabled}
          aria-labelledby={labelID}
          ref={ref}
        >
          <Box
            className={cx(
              classes.rightContentRightMargin,
              pipe(
                props.rightContent,
                O.fold(constUndefined, () => classes.rightContentLeftMargin)
              )
            )}
          >
            {pipe(props.rightContent, O.toNullable)}
          </Box>
        </InputChildren>
        {pipe(
          props.error,
          O.map(error => (
            <>
              <Space units={1} />
              <FieldMessage type="negative">{error}</FieldMessage>
            </>
          )),
          O.toNullable
        )}
      </Box>
    );
  }
);
