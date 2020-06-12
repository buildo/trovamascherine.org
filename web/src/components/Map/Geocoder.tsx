import * as React from "react";
import ReactMapGL, { ViewportProps } from "react-map-gl";
import Geocoder_ from "react-map-gl-geocoder";
import { config } from "../../config";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useFormatMessage } from "../../intl";

type Props = {
  mapRef: React.RefObject<ReactMapGL>;
  onViewportChange: (viewport: ViewportProps) => unknown;
};

export function Geocoder(props: Props) {
  const formatMessage = useFormatMessage();
  return (
    <Geocoder_
      position="top-left"
      inputValue=""
      mapRef={props.mapRef}
      onViewportChange={props.onViewportChange}
      mapboxApiAccessToken={config.mapboxApiKey}
      countries="it"
      language="it"
      placeholder={formatMessage("Geocoder.placeholder")}
    />
  );
}
