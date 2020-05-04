import * as React from "react";
import { Text } from "../Text/Text";
import { FormattedMessage } from "../../intl";
import formatRelative from "date-fns/formatRelative";
import it from "date-fns/locale/it";
import { Option, fold } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

type Props = {
  value: Option<Date>;
  fallbackMessage: string;
};

export function LastUpdate(props: Props) {
  return (
    <Text size={2}>
      {pipe(
        props.value,
        fold(
          () => <>{props.fallbackMessage}</>,
          value => (
            <FormattedMessage
              id="LastUpdate.message"
              values={{
                relative: formatRelative(value, new Date(), {
                  locale: it,
                }),
              }}
            />
          )
        )
      )}
    </Text>
  );
}
