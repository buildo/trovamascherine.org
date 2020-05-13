import React, { useContext } from "react";
import cx from "classnames";

import { _MapContext } from "react-map-gl";

import {
  geolocateControlWrapper,
  geolocateCopy,
  geolocateControlDisabled,
} from "./geolocateControl.treat";

import {
  getBoundsFromGeoPosition,
  getViewportStateFromBounds,
} from "../../util/geoUtils";

import { Box } from "../Box/Box";
import { GeolocateIcon } from "../Icons/GeolocateIcon";
import { useGeolocateSupport } from "../../useGeolocateSupport";
import { FormattedMessage } from "../../intl";

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
    <Box
      vAlignContent="center"
      className={cx(geolocateControlWrapper, {
        [geolocateControlDisabled]: !isGeolocationSupported,
      })}
      onClick={geolocateUser}
    >
      <GeolocateIcon width={20} height={20} />
      <Box className={geolocateCopy}>
        <FormattedMessage id="GeolocateControl.buttonLabel" />
      </Box>
    </Box>
  );
}
