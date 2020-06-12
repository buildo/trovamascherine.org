declare module "react-map-gl-geocoder" {
  import { ContextViewportChangeHandler } from "react-map-gl";

  type Props = {
    mapRef: any;
    mapboxApiAccessToken: string;
    inputValue: string;
    zoom?: number;
    placeholder?: string;
    countries?: string;
    language?: string;
    onViewportChange?: ContextViewportChangeHandler;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  };

  export default function Geocoder(props: Props): JSX.Element;
}
