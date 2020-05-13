import mapboxgl from "mapbox-gl";
import WebMercatorViewport, { Bounds } from "viewport-mercator-project";
import { FlyToInterpolator } from "react-map-gl";

export function getBoundsFromGeoPosition(position: Position): Bounds {
  const center = new mapboxgl.LngLat(
    position.coords.longitude,
    position.coords.latitude
  );
  const radius = position.coords.accuracy;

  const bounds = center.toBounds(radius);

  const northEastBounds = bounds.getNorthEast();
  const southEast = bounds.getSouthWest();

  return [
    [northEastBounds.lng, northEastBounds.lat],
    [southEast.lng, southEast.lat],
  ];
}

export function getViewportStateFromBounds(
  bounds: Bounds,
  viewport: WebMercatorViewport
): WebMercatorViewport {
  const { longitude, latitude, zoom } = new WebMercatorViewport(
    viewport
  ).fitBounds(bounds);

  const newViewState = Object.assign({}, viewport, {
    longitude,
    latitude,
    zoom,
    transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
    transitionDuration: "auto",
  });

  return newViewState;
}
