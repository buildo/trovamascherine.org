import * as React from "react";
import { Marker as ReactMapMarker } from "react-map-gl";

import cx from "classnames";
import * as classes from "./UserMarker.treat";

interface IMapMarkerProps {
  latitude?: number;
  longitude?: number;
}

export default function UserMarker(props: IMapMarkerProps) {
  if (props.latitude && props.longitude) {
    return (
      <ReactMapMarker latitude={props.latitude} longitude={props.longitude}>
        <div className={cx(classes.markerWrapper, classes.markerWrapper)}>
          <div className={classes.markerRing} />
          <div className={classes.marker} />
        </div>
      </ReactMapMarker>
    );
  } else {
    return null;
  }
}
