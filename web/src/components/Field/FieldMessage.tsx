import * as React from "react";
import * as classes from "./FieldMessage.treat";
import { Text } from "../Text/Text";

type Props = {
  type: classes.FieldMessageType;
  children: string;
};

export function FieldMessage(props: Props) {
  return (
    <Text size={2} className={classes.fieldMessage[props.type]}>
      {props.children}
    </Text>
  );
}
