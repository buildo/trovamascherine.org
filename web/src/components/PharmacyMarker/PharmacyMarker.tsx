import * as React from "react";
import { Popup } from "react-map-gl";
import { Box } from "../Box/Box";
import GoodStatus from "../GoodStatus";
import * as classes from "./PharmacyMarker.treat";
import cx from "classnames";
import { getColorClassNameFromBucket } from "../../util/ColorBucket";
import { PharmaQuestionMarkIcon } from "../Icons/PharmaQuestionMarkIcon";

interface IPharmacyMarkerProps {
  latitude: number;
  longitude: number;
  id: string;
  quantities: {
    Mascherina: number;
    Guanti: number;
    Gel: number;
    Termoscanner: number;
  };
  onClick: () => unknown;
  updatedOnce: boolean;
  isVisible: boolean;
}

function PharmacyMarker(props: IPharmacyMarkerProps) {
  if (!props.isVisible) {
    return null;
  }

  const mascherinaStatus = `top-left-${getColorClassNameFromBucket(
    "Mascherina",
    props.quantities.Mascherina
  )}`;
  const glovesStatus = `bottom-left-${getColorClassNameFromBucket(
    "Guanti",
    props.quantities.Guanti
  )}`;
  const gelStatus = `top-right-${getColorClassNameFromBucket(
    "Gel",
    props.quantities.Gel
  )}`;
  const termoScannerStatus = `bottom-right-${getColorClassNameFromBucket(
    "Termoscanner",
    props.quantities.Termoscanner
  )}`;

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
        onClick={props.onClick}
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
                  good="Mascherina"
                  quantity={props.quantities.Mascherina}
                />
                <GoodStatus
                  className={classes.goodStatus}
                  good="Gel"
                  quantity={props.quantities.Gel}
                />
              </Box>
              <Box className={classes.pharmacyPopupRow} hAlignContent="center">
                <GoodStatus
                  className={classes.goodStatus}
                  good="Guanti"
                  quantity={props.quantities.Guanti}
                />
                <GoodStatus
                  className={classes.goodStatus}
                  good="Termoscanner"
                  quantity={props.quantities.Termoscanner}
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
