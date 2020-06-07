import * as React from "react";
import { useIsMobile } from "../../useMatchMedia";
import { Button } from "../Button/Button";
import { PhoneIcon } from "../Icons/PhoneIcon";
import { useCopyToClipboard } from "../../useCopyToClipboard";
import { some } from "fp-ts/lib/Option";
import * as classes from "./PhoneButton.treat";
import { Space } from "../Space/Space";
import { Box } from "../Box/Box";
import { Label } from "../Text/Label";
import { FormattedMessage } from "../../intl";

type Props = {
  number: string;
  size: React.ComponentProps<typeof Button>["size"];
};

function iconSize(buttonSize: Props["size"]): number {
  switch (buttonSize) {
    case "small":
      return 18;
    case "medium":
      return 22;
  }
}

export function PhoneButton(props: Props) {
  const isMobile = useIsMobile();
  const [copy, copied] = useCopyToClipboard(props.number);
  const size = iconSize(props.size);
  return (
    <>
      <Space units={3} />
      <Box hAlignContent="center" className={classes.phoneButton} column>
        <Button
          variant="secondary"
          size={props.size}
          icon={some(<PhoneIcon width={size} height={size} />)}
          label={props.number}
          action={() => {
            if (isMobile) {
              document.location.href = `tel://${props.number}`;
            } else {
              copy();
            }
          }}
        />
        {copied && (
          <Label className={classes.copiedMessage} size={3}>
            <FormattedMessage id="PhoneButton.copiedMessage" />
          </Label>
        )}
      </Box>
    </>
  );
}
