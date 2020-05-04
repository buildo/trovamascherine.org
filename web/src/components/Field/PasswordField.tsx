import * as React from "react";
import { useState } from "react";
import { InputField } from "./InputField";
import { some } from "fp-ts/lib/Option";
import { Box } from "../Box/Box";
import { Label } from "../Text/Label";
import { label } from "./PasswordField.treat";

type Props = Omit<
  React.ComponentProps<typeof InputField>,
  "type" | "rightContent"
> & {
  /**
   * Label for the "show password" action
   */
  showLabel: string;
  /**
   * Label for the "hide password" action
   */
  hideLabel: string;
};

export function PasswordField(props: Props) {
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const rightContent = (
    <Box
      className={label}
      onClick={() =>
        setInputType(inputType => (inputType === "text" ? "password" : "text"))
      }
    >
      <Label size={1}>
        {inputType === "text" ? props.hideLabel : props.showLabel}
      </Label>
    </Box>
  );
  return (
    <InputField type={inputType} rightContent={some(rightContent)} {...props} />
  );
}
