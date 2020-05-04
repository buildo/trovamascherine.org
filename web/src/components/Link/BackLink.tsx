import * as React from "react";
import { Link } from "./Link";
import { history } from "../../history";
import { FormattedMessage } from "../../intl";

export function BackLink() {
  return (
    <Link href="#" onClick={history.goBack}>
      <FormattedMessage id="BackLink.label" />
    </Link>
  );
}
