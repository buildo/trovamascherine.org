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
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { config } from "./config";

export function App() {
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

  return (
    <HelmetProvider>
      <IntlProvider>
        <ErrorBoundary>
          {pipe(
            parse(history.location),
            fold(
              () => (
                <>
                  <Helmet>
                    {userReportScript}
                    {metaCittadino}
                  </Helmet>
                  <MapView />
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
              supplierId => (
                <>
                  <Helmet>
                    {userReportScript}
                    {metaCittadino}
                  </Helmet>
                  <DetailsView supplierId={supplierId} />
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
