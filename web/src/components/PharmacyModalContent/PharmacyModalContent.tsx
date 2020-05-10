import React from "react";
import { option } from "fp-ts";
import { Box } from "../Box/Box";
import { GoodStatusDetails } from "../GoodStatusDetails/GoodStatusDetails";
import { Modal } from "../Modal/Modal";
import { SupplierData } from "../../domain";
import * as classes from "./PharmacyModalContent.treat";
import { pipe } from "fp-ts/lib/pipeable";
import { toNullable, fold, isSome } from "fp-ts/lib/Option";
import { getOrElse } from "fp-ts/lib/Option";
import { Space } from "../Space/Space";
import { LastUpdate } from "../UpdateView/LastUpdate";
import { useFormatMessage } from "../../intl";
import { PharmaQuestionMarkIcon } from "../Icons/PharmaQuestionMarkIcon";
import { Label } from "../Text/Label";
import { SupportEmailLink } from "../SupportEmailLink/SupportEmailLink";
import { useIsMobile } from "../../useMatchMedia";
import { quantityByGood } from "../../util/goodQuantity";
import { sequenceS } from "fp-ts/lib/Apply";
import { left, right } from "fp-ts/lib/Either";
import { constant } from "fp-ts/lib/function";

interface IPharmacyModalContentProps {
  onDismiss: () => unknown;
  selectedSupplier: SupplierData;
}

const defaultQuantity = constant(0);

function PharmacyModalContent(props: IPharmacyModalContentProps) {
  const { selectedSupplier } = props;
  const { supplies } = selectedSupplier;
  const name = pipe(selectedSupplier.name, toNullable);
  const formatMessage = useFormatMessage();

  const mascherina = pipe(
    sequenceS(option.option)({
      ffp: quantityByGood("MascherinaFFP", supplies),
      chirurgica: quantityByGood("MascherinaChirurgica", supplies),
    }),
    option.fold(
      () =>
        pipe(
          quantityByGood("Mascherina", supplies),
          option.getOrElse(defaultQuantity),
          left
        ),
      m => right(m)
    )
  );
  const glove = pipe(
    quantityByGood("Guanti", supplies),
    getOrElse(defaultQuantity)
  );
  const gel = pipe(quantityByGood("Gel", supplies), getOrElse(defaultQuantity));
  const termoScanner = pipe(
    quantityByGood("Termoscanner", supplies),
    getOrElse(defaultQuantity)
  );

  const isMobile = useIsMobile();
  const space = isMobile ? <Space units={4} /> : <Space units={8} />;

  return (
    <Modal title={name || ""} onDismiss={option.some(props.onDismiss)}>
      <Box column width="100%">
        <Box className={classes.pharmacyModalContentAddress}>
          {selectedSupplier.address}
          {pipe(
            selectedSupplier.city,
            fold(
              () => "",
              city => `, ${city}`
            )
          )}{" "}
          - {selectedSupplier.cap}
          {pipe(
            selectedSupplier.province,
            fold(
              () => "",
              province => ` (${province})`
            )
          )}
        </Box>
        <Box hAlignContent="center" width="100%" column>
          {isSome(selectedSupplier.lastUpdatedOn) ? (
            <>
              {space}
              <LastUpdate
                value={selectedSupplier.lastUpdatedOn}
                fallbackMessage={formatMessage(
                  "PharmacyModalContent.neverUpdated"
                )}
              />
              {space}
              <GoodStatusDetails
                mascherina={mascherina}
                gel={gel}
                glove={glove}
                termoScanner={termoScanner}
              />
            </>
          ) : (
            <>
              {space}
              <PharmaQuestionMarkIcon width={76} height={76} />
              {space}
              <LastUpdate
                value={selectedSupplier.lastUpdatedOn}
                fallbackMessage={formatMessage(
                  "PharmacyModalContent.neverUpdated"
                )}
              />
              {space}
              <Label size={2}>
                Lavori in questa farmacia e hai problemi a caricare un
                aggiornamento?
                <br />
                Scrivi a <SupportEmailLink /> per ricevere assistenza.
              </Label>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default React.memo(PharmacyModalContent);
