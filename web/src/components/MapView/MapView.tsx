import * as React from "react";
import { getMapSearchResults } from "../../API";
import { useAPI } from "../../useAPI";
import { pipe } from "fp-ts/lib/pipeable";
import { fold } from "../../RemoteData";
import Map from "../Map";
import { Loading } from "../Loading/Loading";
import { GenericError } from "../Error/GenericError";
import { useFormatMessage } from "../../intl";
import { Box } from "../Box/Box";
import { pharmacistCTA } from "./MapView.treat";
import { PharmacistCTAModal } from "./PharmacistCTAModal";
import { Button } from "../Button/Button";
import { option } from "fp-ts";
import { Option } from "fp-ts/lib/Option";
import { MapState, CurrentView } from "../../CurrentView";
import { LocalStorage } from "../../util/LocalStorage";
import { UUID } from "io-ts-types/lib/UUID";

type Props = {
  mapState: Option<MapState>;
  supplier: Option<UUID>;
  onUpdateCurrentView: (view: CurrentView) => unknown;
};

const mapStateKey = "mapState";

export function MapView(props: Props) {
  const mapState = pipe(
    props.mapState,
    option.alt(() => LocalStorage.getItem(mapStateKey, MapState)),
    option.getOrElse(() => ({
      // default coordinates: Rome with zoom level Italy
      latitude: 41.902782,
      longitude: 12.496366,
      zoom: 5,
    }))
  );

  const mapSearchResults = useAPI(getMapSearchResults);
  const [showPharmacistModal, setShowPharmacistModal] = React.useState(false);
  const formatMessage = useFormatMessage();
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
          <Map
            mapSearchResults={data}
            mapState={mapState}
            onMapStateChange={mapState => {
              props.onUpdateCurrentView({
                view: "map",
                mapState: option.some(mapState),
                supplier: props.supplier,
              });
              LocalStorage.setItem(mapStateKey, MapState, mapState);
            }}
            supplier={props.supplier}
            onSupplierChange={supplier => {
              props.onUpdateCurrentView({
                view: "map",
                mapState: option.some(mapState),
                supplier,
              });
            }}
          />

          <Box
            vAlignContent="center"
            hAlignContent="center"
            className={pharmacistCTA}
          >
            <Button
              variant="secondary"
              size="medium"
              label={formatMessage("MapView.pharmacyCTA")}
              action={() => {
                setShowPharmacistModal(true);
              }}
              icon={option.none}
            />
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
