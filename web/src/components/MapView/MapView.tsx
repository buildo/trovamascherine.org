import * as React from "react";
import { getMapSearchResults } from "../../API";
import { useAPI } from "../../useAPI";
import { pipe } from "fp-ts/lib/pipeable";
import { fold } from "../../RemoteData";
import Map from "../Map";
import { Loading } from "../Loading/Loading";
import { GenericError } from "../Error/GenericError";
import { FormattedMessage } from "../../intl";
import { Box } from "../Box/Box";
import { pharmacistCTA } from "./MapView.treat";
import { PharmacistCTAModal } from "./PharmacistCTAModal";

export function MapView() {
  const mapSearchResults = useAPI(getMapSearchResults);
  const [showPharmacistModal, setShowPharmacistModal] = React.useState(false);
  return pipe(
    mapSearchResults,
    fold(
      () => <Loading />,
      error => (
        <GenericError
          retry={() => window.location.reload()}
          error={new Error(String(error))}
        />
      ),
      data => (
        <>
          <Map mapSearchResults={data} />

          <Box
            vAlignContent="center"
            hAlignContent="center"
            className={pharmacistCTA}
            onClick={e => {
              e.stopPropagation();
              setShowPharmacistModal(true);
            }}
          >
            <FormattedMessage id="MapView.pharmacyCTA" />
          </Box>

          {showPharmacistModal && (
            <PharmacistCTAModal
              onDismiss={() => {
                setShowPharmacistModal(false);
              }}
            />
          )}
        </>
      )
    )
  );
}
