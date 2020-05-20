import React, { useState, useEffect } from "react";
import * as currentView from "./CurrentView";
import { pipe } from "fp-ts/lib/pipeable";
import { UpdateView } from "./components/UpdateView/UpdateView";
import { MapView } from "./components/MapView/MapView";
import { IntlProvider } from "./intl";
import { StatsView } from "./components/StatsView/StatsView";
import { WelcomeModal } from "./components/WelcomeModal/WelcomeModal";
import { CreditsView } from "./components/CreditsView/CreditsView";
import { history } from "./history";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { config } from "./config";
import { flow } from "fp-ts/lib/function";

const metaCittadino = React.cloneElement(<meta name="userreport:mediaId" />, {
  value: config.citizenFeedbackFormId,
});

const metaEsercizioCommerciale = React.cloneElement(
  <meta name="userreport:mediaId" />,
  { value: config.supplierFeedbackFormId }
);

const userReportScript = (
  <script
    src="https://sak.userreport.com/buildoio/launcher.js"
    async
    id="userreport-launcher-script"
  ></script>
);

export function App() {
  const [location, setLocation] = useState(history.location);
  useEffect(() => history.listen(setLocation), []);

  return (
    <HelmetProvider>
      <IntlProvider>
        <ErrorBoundary>
          {pipe(
            currentView.parse(location),
            currentView.fold(
              (supplier, mapState) => (
                <>
                  <Helmet>
                    {userReportScript}
                    {metaCittadino}
                  </Helmet>
                  <MapView
                    supplier={supplier}
                    mapState={mapState}
                    onUpdateCurrentView={flow(
                      currentView.serialize,
                      history.replace
                    )}
                  />
                  <WelcomeModal />
                </>
              ),
              () => (
                <>
                  <Helmet>
                    {userReportScript}
                    {metaCittadino}
                  </Helmet>
                  <StatsView />
                  <WelcomeModal />
                </>
              ),
              token => (
                <>
                  <Helmet>
                    {userReportScript}
                    {metaEsercizioCommerciale}
                  </Helmet>
                  <UpdateView token={token} />
                </>
              ),
              () => (
                <>
                  <Helmet>
                    {userReportScript}
                    {metaCittadino}
                  </Helmet>
                  <CreditsView />
                </>
              )
            )
          )}
        </ErrorBoundary>
      </IntlProvider>
    </HelmetProvider>
  );
}
