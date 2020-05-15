import * as React from "react";
import { Button } from "../Button/Button";
import { WhatsAppIcon } from "../Icons/WhatsAppIcon";
import { Option, map, getOrElse } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

type Props = {
  title: Option<string>;
  link: string;
  size: React.ComponentProps<typeof Button>["size"];
};

function iconSize(buttonSize: Props["size"]): number {
  switch (buttonSize) {
    case "small":
      return 36;
    case "medium":
      return 44;
  }
}

export function WhatsAppButton(props: Props) {
  const size = iconSize(props.size);
  return (
    <Button
      variant="secondaryIcon"
      size={props.size}
      icon={<WhatsAppIcon width={size} height={size} />}
      action={() => {
        document.location.href = `https://wa.me/?text=${encodeURIComponent(
          pipe(
            props.title,
            map(title => `${title} `),
            getOrElse(() => "")
          ) + props.link
        )}`;
      }}
    />
  );
}
