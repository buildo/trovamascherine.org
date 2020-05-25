import * as React from "react";
import * as Z from "fp-ts-contrib/lib/Zipper";
import { pipe } from "fp-ts/lib/pipeable";
import { Box } from "../Box/Box";
import { Button } from "./Button";
import { option } from "fp-ts";
import cx from "classnames";
import * as classes from "./ToggleButtonGroup.treat";
import { Text } from "../Text/Text";
import { Space } from "../Space/Space";

type Option = { label: string; description: string };

type Props = {
  options: Z.Zipper<Option>;
  onChange: (value: Z.Zipper<Option>) => unknown;
};

function className(options: Props["options"], index: number): string {
  return cx(classes.toggleButtonGroupItem, {
    [classes.first]: index === 0,
    [classes.middle]: index > 0 && index < Z.length(options) - 1,
    [classes.last]: index === Z.length(options) - 1,
  });
}

function toButton(props: Props, selected: boolean) {
  return (o: Option, index: number) => (
    <Button
      className={className(props.options, index)}
      label={o.label}
      size="medium"
      icon={option.none}
      variant={selected ? "primary" : "secondary"}
      action={() =>
        pipe(
          Z.move(() => index, props.options),
          option.map(props.onChange)
        )
      }
    />
  );
}

export function ToggleButtonGroup(props: Props) {
  const lefts = props.options.lefts.map(toButton(props, false));
  const rights = props.options.rights.map((o, i) =>
    toButton(props, false)(o, i + 1 + props.options.lefts.length)
  );
  return (
    <Box column hAlignContent="center">
      <Box className={classes.toggleButtonGroup}>
        {lefts}
        {pipe(
          toButton(props, true)(props.options.focus, props.options.lefts.length)
        )}
        {rights}
      </Box>
      <Space units={2} />
      <Text size={2}>{props.options.focus.description}</Text>
    </Box>
  );
}
