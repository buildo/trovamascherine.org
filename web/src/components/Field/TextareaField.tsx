import * as React from "react";
import { CommonProps } from "../../util";
import { Option } from "fp-ts/lib/Option";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { constUndefined } from "fp-ts/lib/function";
import { Box } from "../Box/Box";
import { FieldMessage } from "./FieldMessage";
import { Space } from "../Space/Space";
import * as classes from "./TextareaField.treat";
import cx from "classnames";
import { useUniqueID } from "./useUniqueID";
import { Label } from "../Text/Label";

type Props = CommonProps & {
  /**
   * Current textarea input value
   */
  value: string;
  /**
   * Function called when the user changes the textarea input content
   */
  onChange: (value: string) => unknown;
  /**
   * Textarea label. Should be a very short description
   */
  label: string;
  /**
   * Placeholder displayed inside the textarea when empty
   */
  placeholder: string;
  /**
   * Optional error associated with the textarea, typically related to the current value
   */
  error: Option<string>;
  /**
   * Whether the textarea should be disabled
   */
  disabled?: boolean;
  /**
   * Whether to automatically focus the textarea upon first render.
   * Only a single input element in a given view should have this prop set to true,
   * otherwise the last rendered one obtains the focus.
   */
  autoFocus?: boolean;
  /**
   * Number of textarea rows. Defaults to 4
   */
  rows?: number;
};

export const TextareaField = React.forwardRef<HTMLTextAreaElement, Props>(
  (props, ref) => {
    const labelID = useUniqueID();
    return (
      <Box
        column
        width={props.width || "345px"}
        id={props.id}
        className={props.className}
      >
        <Label size={1} id={labelID}>
          {props.label}
        </Label>
        <Space units={2} />
        <textarea
          className={cx(
            classes.textarea,
            pipe(
              props.error,
              O.fold(constUndefined, () => classes.textareaError)
            )
          )}
          value={props.value}
          onChange={e => props.onChange(e.currentTarget.value)}
          placeholder={props.placeholder}
          autoFocus={props.autoFocus}
          disabled={props.disabled}
          rows={props.rows || 4}
          aria-labelledby={labelID}
          ref={ref}
        />
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
