import * as React from "react";
import { Children } from "../../util";
import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";
import { GenericError } from "../Error/GenericError";

type Props = {
  children: Children;
};

type State = {
  error: option.Option<Error>;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: option.none };

  static getDerivedStateFromError(error: Error): State {
    return { error: option.some(error) };
  }

  render() {
    return pipe(
      this.state.error,
      option.fold(
        () => this.props.children,
        error => (
          <GenericError retry={() => window.location.reload()} error={error} />
        )
      )
    );
  }
}
