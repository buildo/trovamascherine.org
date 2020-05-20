import React from "react";
import { SupplierData } from "../../domain";
import PharmacyMarker from "../PharmacyMarker";
import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";
import { sequenceS } from "fp-ts/lib/Apply";
import { findByGood, quantityByGood } from "../../util/goodQuantity";
import { UUID } from "io-ts-types/lib/UUID";

interface IPharmacyMarkersProps {
  mapSearchResults: Array<SupplierData>;
  onSelect: (id: UUID) => void;
  currentVisibleMarkers: {
    [key: string]: boolean;
  };
}

function PharmacyMarkers(props: IPharmacyMarkersProps) {
  return (
    <>
      {props.mapSearchResults.map(supplier => {
        const ffp = findByGood("MascherinaFFP", supplier.supplies);
        const chirurgica = findByGood(
          "MascherinaChirurgica",
          supplier.supplies
        );
        const totalMasks = pipe(
          { ffp, chirurgica },
          sequenceS(option.option),
          option.map(
            ({ ffp, chirurgica }) => ffp.quantity + chirurgica.quantity
          ),
          option.alt(() => quantityByGood("Mascherina", supplier.supplies)),
          option.getOrElse(() => 0)
        );
        const quantities = {
          Mascherina: totalMasks,
          Guanti: pipe(
            quantityByGood("Guanti", supplier.supplies),
            option.getOrElse(() => 0)
          ),
          Gel: pipe(
            quantityByGood("Gel", supplier.supplies),
            option.getOrElse(() => 0)
          ),
          Termoscanner: pipe(
            quantityByGood("Termoscanner", supplier.supplies),
            option.getOrElse(() => 0)
          ),
        };
        return (
          <PharmacyMarker
            latitude={supplier.latitude}
            longitude={supplier.longitude}
            key={supplier.id}
            id={supplier.id}
            onClick={() => props.onSelect(supplier.id)}
            quantities={quantities}
            updatedOnce={option.isSome(supplier.lastUpdatedOn)}
            isVisible={props.currentVisibleMarkers[supplier.id]}
          />
        );
      })}
    </>
  );
}

export default React.memo(PharmacyMarkers);
