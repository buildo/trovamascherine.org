import * as React from "react";
import { Marker as ReactMapMarker } from "react-map-gl";

interface IMapMarkerProps {
  latitude?: number;
  longitude?: number;
}

function _UserMarker(props: IMapMarkerProps) {
  if (props.latitude && props.longitude) {
    return (
      <ReactMapMarker
        key="location-maker"
        className="mapboxgl-user-location-dot"
        longitude={props.longitude}
        latitude={props.latitude}
        captureDrag={false}
        captureDoubleClick={false}
      />
    );
  } else {
    return null;
  }
}

export const UserMarker = React.memo(_UserMarker);
