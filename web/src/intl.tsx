import * as React from "react";
import {
  IntlProvider as IntlProvider_,
  FormattedMessage as FormattedMessage_,
  useIntl,
} from "react-intl";
import { PrimitiveType } from "intl-messageformat";
import itMessages from "./messages/it.json";
import { Children } from "./util";

export type LocaleMessages = typeof itMessages;
export type LocaleKey = keyof LocaleMessages;

export function useFormatMessage(): (
  id: LocaleKey,
  values?: Record<string, PrimitiveType>
) => string {
  const intl = useIntl();
  return (id, values) => intl.formatMessage({ id }, values);
}

export function FormattedMessage(props: {
  id: LocaleKey;
  values?: Record<string, PrimitiveType>;
  tagName?: keyof JSX.IntrinsicElements;
}) {
  return (
    <FormattedMessage_
      tagName={props.tagName}
      id={props.id}
      values={props.values}
    />
  );
}

export function IntlProvider(props: { children: Children }) {
  return (
    <IntlProvider_ messages={itMessages} locale="it">
      {props.children}
    </IntlProvider_>
  );
}
