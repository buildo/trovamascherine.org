import * as React from "react";
import ReactMapGL, {
  NavigationControl,
  ViewportProps,
  ExtraState,
  GeolocateControl,
  InteractiveMapProps,
  Source,
  Layer,
  PointerEvent,
} from "react-map-gl";

import { GeoJSONSource } from "mapbox-gl";

import { SupplierData } from "../../domain";
import * as classes from "./Map.treat";
import PharmacyMarkes from "./PharmacyMarkers";
import { config } from "../../config";

import debounce from "lodash.debounce";
import "mapbox-gl/dist/mapbox-gl.css";

import InfoButton from "../InfoButton";
import { InfoModal } from "../InfoModal/InfoModal";
import PharmacyModalContent from "../PharmacyModalContent";
import * as D from "io-ts/lib/Decoder";
import { pipe } from "fp-ts/lib/pipeable";
import { option } from "fp-ts";
import { LocalStorage } from "../../util/LocalStorage";

const mapbox_api = config.mapboxApiKey;

const MAPBOX_MAP_STYLE = "mapbox://styles/mapbox/streets-v10?optimize=true";

const generateFeature = (supplier: SupplierData) => ({
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [supplier.longitude, supplier.latitude],
  },
  properties: {
    _id: supplier.id,
  },
});

const generateGeoJSON = (suppliersData: Array<SupplierData>) => {
  return {
    type: "FeatureCollection",
    features: suppliersData.map(generateFeature),
  };
};

interface ReactMapGLWithAsyncMissingProps extends InteractiveMapProps {
  asyncRender?: boolean;
  getRef: (a: any) => void;
}

class ReactMapGLWithAsync extends React.PureComponent<
  ReactMapGLWithAsyncMissingProps
> {
  render() {
    return <ReactMapGL ref={this.props.getRef} {...(this.props as any)} />;
  }
}

type IMapState = {
  viewport: {
    width: number;
    height: number;
  };
  currentMapState: Partial<ViewportProps>;
  isInfoModalOpen: boolean;
  isDetailsModalOpen: boolean;
  selectedSupplier?: SupplierData;
  currentVisibleMarkers: {
    [key: string]: boolean;
  };
  sourceGeoJSON?: any;
};

interface IMapProps {
  mapSearchResults: Array<SupplierData>;
}

const MapState = D.type({
  latitude: D.number,
  longitude: D.number,
  zoom: D.number,
});

const mapStateKey = "mapState";

function getCurrentMapState(): IMapState["currentMapState"] {
  return pipe(
    LocalStorage.getItem(mapStateKey, MapState),
    option.getOrElse(() => ({
      // default coordinates: Rome with zoom level Italy
      latitude: 41.902782,
      longitude: 12.496366,
      zoom: 5,
    }))
  );
}

export default class Map extends React.Component<IMapProps, IMapState> {
  state: IMapState = {
    viewport: {
      width: 0,
      height: 0,
    },
    currentMapState: getCurrentMapState(),
    isInfoModalOpen: false,
    isDetailsModalOpen: false,
    currentVisibleMarkers: {},
  };

  mapBoxRef: any = undefined;
  private _sourceRef: React.RefObject<Source> = React.createRef<Source>();

  componentDidMount() {
    window.addEventListener("resize", this._resize);

    this._resize();
    this.setGeoJSON();
  }

  setGeoJSON = () => {
    const geoJSON = generateGeoJSON(this.props.mapSearchResults);

    this.setState({ sourceGeoJSON: geoJSON });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  _resize = () => {
    requestAnimationFrame(() => {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: window.innerWidth,
          height: window.innerHeight,
        },
      });
    });
  };

  onViewportChange = (viewport: ViewportProps) => {
    const { width, height, ...mapState } = viewport;

    this.setState({
      viewport: { width, height },
      currentMapState: mapState,
    });

    LocalStorage.setItem(mapStateKey, mapState);
  };

  onInteractionStateChange = (extraState: ExtraState) => {
    if (
      extraState.isDragging ||
      extraState.inTransition ||
      extraState.isRotating ||
      extraState.isHovering ||
      extraState.isPanning
    )
      return;

    this.filterVisibleMarkerDebounced();
  };

  onPharmacyClick = (id: string) => {
    const selectedSupplier = this.props.mapSearchResults.filter(
      sup => sup.id === id
    )[0];

    this.setState({ selectedSupplier, isDetailsModalOpen: true });
  };

  filterVisibleMarker = () => {
    requestAnimationFrame(() => {
      if (!this.mapBoxRef) {
        return;
      }

      const visibleFeatures = this.mapBoxRef
        .getMap()
        .queryRenderedFeatures({ layers: ["visible-pharmacy"] });

      const { currentVisibleMarkers } = this.state;
      const newCurrentVisibleMarkers: IMapState["currentVisibleMarkers"] = {};

      const markerIdsOnMap: string[] = visibleFeatures.map(
        (feature: any) => feature.properties._id
      );

      for (const _id of [
        ...markerIdsOnMap,
        ...Object.keys(currentVisibleMarkers),
      ]) {
        newCurrentVisibleMarkers[_id] = markerIdsOnMap.includes(_id);
      }

      this.setState({
        currentVisibleMarkers: {
          ...currentVisibleMarkers,
          ...newCurrentVisibleMarkers,
        },
      });
    });
  };

  filterVisibleMarkerDebounced = debounce(this.filterVisibleMarker, 300);

  onMapLoad = () => {
    this.filterVisibleMarkerDebounced();
  };

  _onClick = (event: PointerEvent) => {
    const feature = event.features[0];
    if (!feature || !this._sourceRef.current) {
      return;
    }
    const clusterId = feature.properties.cluster_id;

    const mapboxSource: GeoJSONSource = (this
      ._sourceRef as any).current.getSource();

    mapboxSource.getClusterExpansionZoom(
      clusterId,
      (err: string, zoom: number) => {
        if (err) {
          return;
        }
        const currentViewPort = {
          ...this.state.viewport,
          ...this.state.currentMapState,
        };

        this.onViewportChange({
          ...(currentViewPort as ViewportProps),
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1],
          zoom,
          transitionDuration: 500,
        });
      }
    );
  };

  render() {
    const { isDetailsModalOpen, selectedSupplier } = this.state;

    return (
      <div className={classes.map}>
        <ReactMapGLWithAsync
          {...this.state.viewport}
          {...this.state.currentMapState}
          mapboxApiAccessToken={mapbox_api}
          onViewportChange={this.onViewportChange}
          onInteractionStateChange={this.onInteractionStateChange}
          onLoad={this.onMapLoad}
          mapStyle={MAPBOX_MAP_STYLE}
          asyncRender
          onClick={this._onClick}
          interactiveLayerIds={["pharmacy-clusters"]}
          getRef={a => (this.mapBoxRef = a)}
        >
          <Source
            id="pharmacy-markers"
            type="geojson"
            cluster={true}
            clusterRadius={100}
            data={this.state.sourceGeoJSON}
            ref={this._sourceRef}
          >
            <Layer
              id="visible-pharmacy"
              type="circle"
              paint={{ "circle-opacity": 0 }}
              filter={["!", ["has", "point_count"]]}
            />

            <Layer
              type="circle"
              paint={{
                "circle-radius": 40,
                "circle-color": "#000",
                "circle-opacity": 1,
                "circle-blur": 0.6,
              }}
              filter={["has", "point_count"]}
            />

            <Layer
              type="circle"
              id="pharmacy-clusters"
              paint={{
                "circle-radius": 28,
                "circle-color": "#fff",
                "circle-stroke-color": "#ECEDF0",
                "circle-stroke-width": 8,
              }}
              filter={["has", "point_count"]}
            />

            <Layer
              type="symbol"
              filter={["has", "point_count"]}
              paint={{
                "text-color": "#000",
              }}
              layout={{
                "text-field": "{point_count_abbreviated}",
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                "text-size": 18,
              }}
            />
          </Source>

          <div className={classes.infoButtonWrapper}>
            <InfoButton
              onClick={() => {
                this.setState({ isInfoModalOpen: true });
              }}
            />
          </div>
          <div className={classes.navigationControlWrapper}>
            <NavigationControl showCompass={false} />
            <GeolocateControl
              className={classes.geolocateControlWrapper}
              showUserLocation={false}
              trackUserLocation={false}
            />
          </div>
          <PharmacyMarkes
            currentVisibleMarkers={this.state.currentVisibleMarkers}
            mapSearchResults={this.props.mapSearchResults}
            onSelect={this.onPharmacyClick}
          />
        </ReactMapGLWithAsync>

        {this.state.isInfoModalOpen && (
          <InfoModal
            onDismiss={() => this.setState({ isInfoModalOpen: false })}
          />
        )}
        {isDetailsModalOpen && selectedSupplier && (
          <PharmacyModalContent
            onDismiss={() => {
              this.setState({
                isDetailsModalOpen: false,
                selectedSupplier: undefined,
              });
            }}
            selectedSupplier={selectedSupplier}
          />
        )}
      </div>
    );
  }
}
