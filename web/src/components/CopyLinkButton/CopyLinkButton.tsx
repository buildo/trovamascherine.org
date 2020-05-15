import * as React from "react";
import { useCopyToClipboard } from "../../useCopyToClipboard";
import { Button } from "../Button/Button";
import { LinkIcon } from "../Icons/LinkIcon";
import { Box } from "../Box/Box";
import * as classes from "./CopyLinkButton.treat";
import { Label } from "../Text/Label";
import { FormattedMessage } from "../../intl";
import { useIsMobile } from "../../useMatchMedia";

type Props = {
  link: string;
  size: React.ComponentProps<typeof Button>["size"];
};

function iconHeight(buttonSize: Props["size"]): number {
  switch (buttonSize) {
    case "small":
      return 18;
    case "medium":
      return 22;
  }
}

function iconWidth(buttonSize: Props["size"]): number {
  switch (buttonSize) {
    case "small":
      return 36;
    case "medium":
      return 44;
  }
}

export function CopyLinkButton(props: Props) {
  const [copy, copied] = useCopyToClipboard(props.link);
  const isMobile = useIsMobile();
  return (
    <Box
      hAlignContent={isMobile ? "center" : "right"}
      className={classes.copyLinkButton}
    >
      <Button
        variant="secondaryIcon"
        size={props.size}
        icon={
          <LinkIcon
            width={iconWidth(props.size)}
            height={iconHeight(props.size)}
          />
        }
        action={copy}
      />
      {copied && (
        <Label className={classes.copiedMessage} size={3}>
          <FormattedMessage id="CopyLinkButton.copiedMessage" />
        </Label>
      )}
    </Box>
  );
}
