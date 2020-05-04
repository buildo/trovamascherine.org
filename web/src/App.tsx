import React from "react";
import { parse, fold } from "./CurrentView";
import { pipe } from "fp-ts/lib/pipeable";
import { DetailsView } from "./components/DetailsView/DetailsView";
import { UpdateView } from "./components/UpdateView/UpdateView";
import { MapView } from "./components/MapView/MapView";
import { IntlProvider } from "./intl";
import { StatsView } from "./components/StatsView/StatsView";
import { WelcomeModal } from "./components/WelcomeModal/WelcomeModal";
import { CreditsView } from "./components/CreditsView/CreditsView";
import { history } from "./history";

export function App() {
  return (
    <IntlProvider>
      {pipe(
        parse(history.location),
        fold(
          () => (
            <>
              <MapView />
              <WelcomeModal />
            </>
          ),
          () => (
            <>
              <StatsView />
              <WelcomeModal />
            </>
          ),
          supplierId => (
            <>
              <DetailsView supplierId={supplierId} />
              <WelcomeModal />
            </>
          ),
          token => <UpdateView token={token} />,
          () => <CreditsView />
        )
      )}
    </IntlProvider>
  );
}
