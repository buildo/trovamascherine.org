import React from "react";
import { InfoIcon } from "../Icons/InfoIcon";
import { Button } from "../Button/Button";

interface Props {
  onClick: () => unknown;
}

export function InfoButton(props: Props) {
  return (
    <Button
      variant="primaryIcon"
      size="medium"
      action={props.onClick}
      icon={<InfoIcon width={44} height={44} />}
    />
  );
}
