import React, { useContext } from "react";
import { _MapContext } from "react-map-gl";
import {
  getBoundsFromGeoPosition,
  getViewportStateFromBounds,
} from "../../util/geoUtils";
import { GeolocateIcon } from "../Icons/GeolocateIcon";
import { useGeolocateSupport } from "../../useGeolocateSupport";
import { Button } from "../Button/Button";

type Props = {
  onGeolocate: (position: Position) => void;
};

export function GeolocateControl(props: Props) {
  const isGeolocationSupported = useGeolocateSupport();
  const mapContext = useContext(_MapContext);

  function handleUserPosition(position: Position) {
    const { viewport, onViewportChange } = mapContext;

    if (!viewport) {
      return;
    }

    const bounds = getBoundsFromGeoPosition(position);

    const newViewportState = getViewportStateFromBounds(bounds, viewport);

    // Call old style callback
    (onViewportChange as any)(newViewportState);

    props.onGeolocate(position);
  }

  function geolocateUser() {
    if (isGeolocationSupported) {
      navigator.geolocation.getCurrentPosition(handleUserPosition);
    }
  }

  return (
    <Button
      variant="primaryIcon"
      size="medium"
      disabled={!isGeolocationSupported}
      action={geolocateUser}
      icon={<GeolocateIcon width={44} height={24} />}
    />
  );
}
