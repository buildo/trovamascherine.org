import * as React from "react";
import { Box } from "../Box/Box";
import { Label } from "../Text/Label";
import { Children } from "../../util";
import { fromKeyCodeFilter, keyCodes } from "../keyCodes";
import cx from "classnames";
import { checkbox, checked, label } from "./CheckboxField.treat";
import { Space } from "../Space/Space";
import { Option } from "fp-ts/lib/Option";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { FieldMessage } from "./FieldMessage";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: Children;
  error: Option<string>;
};

export function CheckboxField(props: Props) {
  const toggle = () => props.onChange(!props.value);
  return (
    <Box column>
      <Box vAlignContent="top">
        <Box
          vAlignContent="center"
          hAlignContent="center"
          className={cx(checkbox, checked[props.value ? "true" : "false"])}
          onMouseDown={e => e.preventDefault()} // prevents "focus" when clicking
          onClick={toggle}
          onKeyDown={fromKeyCodeFilter(keyCodes.Space, e => {
            e.preventDefault();
            e.stopPropagation();
            toggle();
          })}
          tabIndex={0}
        >
          {props.value && (
            <svg viewBox="0 0 19 14" width="12px" height="12px">
              <g transform="translate(-3 -5)">
                <path
                  fill="currentColor"
                  d="M20.889 7.961l-10.53 10.53a1.733 1.733 0 0 1-2.453 0l-4.399-4.397A1.736 1.736 0 0 1 5.96 11.64l3.172 3.172 9.304-9.303a1.733 1.733 0 0 1 2.453 0 1.733 1.733 0 0 1 0 2.452"
                />
              </g>
            </svg>
          )}
        </Box>
        <Box grow shrink onClick={toggle} className={label}>
          <Space units={2} />
          <Label size={2}>{props.label}</Label>
        </Box>
      </Box>
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
