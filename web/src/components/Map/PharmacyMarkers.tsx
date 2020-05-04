import React from "react";
import { SupplierData } from "../../domain";
import PharmacyMarker from "../PharmacyMarker";
import { isSome } from "fp-ts/lib/Option";

interface IPharmacyMarkersProps {
  mapSearchResults: Array<SupplierData>;
  onSelect: (id: string) => void;
  currentVisibleMarkers: {
    [key: string]: boolean;
  };
}

function PharmacyMarkers(props: IPharmacyMarkersProps) {
  return (
    <>
      {props.mapSearchResults.map(supplier => (
        <PharmacyMarker
          latitude={supplier.latitude}
          longitude={supplier.longitude}
          key={supplier.id}
          id={supplier.id}
          onSelect={props.onSelect}
          supplyData={supplier.supplies}
          updatedOnce={isSome(supplier.lastUpdatedOn)}
          isVisible={props.currentVisibleMarkers[supplier.id]}
        />
      ))}
    </>
  );
}

export default React.memo(PharmacyMarkers);
