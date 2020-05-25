import * as React from "react";
import { InputField } from "./InputField";
import { Option, filter, map } from "fp-ts/lib/Option";
import { CloseIcon } from "../Icons/CloseIcon";
import { Box } from "../Box/Box";
import { clearIcon } from "./TextField.treat";
import { useForwardedRef } from "../../util";
import { pipe } from "fp-ts/lib/pipeable";

type Props = Omit<
  React.ComponentProps<typeof InputField>,
  "type" | "rightContent"
> & {
  /**
   * Whether to show the "clear" button or not, and what value should be used to reset the field
   */
  clearable: Option<string>;
  /**
   * Type of the underlying input element
   */
  type?: "text" | "email" | "number" | "tel";
};

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  ({ type, clearable, value, onChange, ...props }, forwardedRef) => {
    const [ownRef, ref] = useForwardedRef(forwardedRef);
    const rightContent = pipe(
      clearable,
      filter(reset => reset !== value),
      map(reset => (
        <Box
          className={clearIcon}
          onClick={() => {
            onChange(reset);
            ownRef.current?.focus();
          }}
        >
          <CloseIcon width={20} height={20} />
        </Box>
      ))
    );

    return (
      <InputField
        type={type || "text"}
        rightContent={rightContent}
        value={value}
        onChange={onChange}
        ref={ref}
        {...props}
      />
    );
  }
);
