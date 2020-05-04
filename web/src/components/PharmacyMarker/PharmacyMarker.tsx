import * as React from "react";
import { Popup } from "react-map-gl";
import { Box } from "../Box/Box";
import GoodStatus from "../GoodStatus";

import * as classes from "./PharmacyMarker.treat";
import { findFirst } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/pipeable";
import { getOrElse } from "fp-ts/lib/Option";
import cx from "classnames";
import { getColorClassNameFromBucket } from "../../util/ColorBucket";
import { PharmaQuestionMarkIcon } from "../Icons/PharmaQuestionMarkIcon";

interface Supply {
  good: "Mascherina" | "Guanti" | "Gel" | "Termoscanner";
  quantity: number;
}

interface IPharmacyMarkerProps {
  latitude: number;
  longitude: number;
  id: string;
  supplyData: Array<Supply>;
  onSelect: (id: string) => void;
  updatedOnce: boolean;
  isVisible: boolean;
}

function PharmacyMarker(props: IPharmacyMarkerProps) {
  if (!props.isVisible) {
    return null;
  }
  const mascherina = pipe(
    props.supplyData,
    findFirst(a => a.good === "Mascherina"),
    getOrElse(() => {
      return {
        good: "Mascherina",
        quantity: 0,
      } as Supply;
    })
  );

  const mascherinaStatus = `top-left-${getColorClassNameFromBucket(
    mascherina
  )}`;

  const glove = pipe(
    props.supplyData,
    findFirst(supply => supply.good === "Guanti"),
    getOrElse(() => {
      return {
        good: "Guanti",
        quantity: 0,
      } as Supply;
    })
  );

  const glovesStatus = `bottom-left-${getColorClassNameFromBucket(glove)}`;

  const gel = pipe(
    props.supplyData,
    findFirst(supply => supply.good === "Gel"),
    getOrElse(() => {
      return {
        good: "Gel",
        quantity: 0,
      } as Supply;
    })
  );
  const gelStatus = `top-right-${getColorClassNameFromBucket(gel)}`;

  const termoScanner = pipe(
    props.supplyData,
    findFirst(supply => supply.good === "Termoscanner"),
    getOrElse(() => {
      return {
        good: "Termoscanner",
        quantity: 0,
      } as Supply;
    })
  );

  const termoScannerStatus = `bottom-right-${getColorClassNameFromBucket(
    termoScanner
  )}`;

  function onClick() {
    props.onSelect(props.id);
  }

  return (
    <Popup
      latitude={props.latitude}
      longitude={props.longitude}
      className={classes.pharmacyPopup}
      tipSize={5}
      dynamicPosition={false}
      closeButton={false}
    >
      <Box
        column
        className={classes.pharmacyPopupContent}
        hAlignContent="center"
        onClick={onClick}
      >
        <div
          className={cx(
            classes.roundedCornerColor,
            mascherinaStatus,
            glovesStatus,
            gelStatus,
            termoScannerStatus
          )}
        ></div>
        <Box
          column
          vAlignContent="center"
          className={classes.whiteCircleContent}
        >
          {props.updatedOnce ? (
            <>
              <Box className={classes.pharmacyPopupRow} hAlignContent="center">
                <GoodStatus
                  className={classes.goodStatus}
                  {...(mascherina as Supply)}
                />
                <GoodStatus
                  className={classes.goodStatus}
                  {...(gel as Supply)}
                />
              </Box>
              <Box className={classes.pharmacyPopupRow} hAlignContent="center">
                <GoodStatus
                  className={classes.goodStatus}
                  {...(glove as Supply)}
                />
                <GoodStatus
                  className={classes.goodStatus}
                  {...(termoScanner as Supply)}
                />
              </Box>
            </>
          ) : (
            <Box
              vAlignContent="center"
              hAlignContent="center"
              style={{ paddingTop: 2, paddingRight: 4 }}
            >
              <PharmaQuestionMarkIcon width={50} height={50} />
            </Box>
          )}
        </Box>
      </Box>
    </Popup>
  );
}
export default React.memo(PharmacyMarker);
