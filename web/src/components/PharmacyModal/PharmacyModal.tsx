import React from "react";
import { option } from "fp-ts";
import { Box } from "../Box/Box";
import { GoodStatusDetails } from "../GoodStatusDetails/GoodStatusDetails";
import { Modal } from "../Modal/Modal";
import { SupplierData } from "../../domain";
import * as classes from "./PharmacyModal.treat";
import { pipe } from "fp-ts/lib/pipeable";
import { toNullable, fold, isSome, some, map } from "fp-ts/lib/Option";
import { getOrElse } from "fp-ts/lib/Option";
import { Space } from "../Space/Space";
import { LastUpdate } from "../SupplierInfo/LastUpdate";
import { useFormatMessage } from "../../intl";
import { PharmaQuestionMarkIcon } from "../Icons/PharmaQuestionMarkIcon";
import { Label } from "../Text/Label";
import { SupportEmailLink } from "../SupportEmailLink/SupportEmailLink";
import { useIsMobile } from "../../useMatchMedia";
import { quantityByGood } from "../../util/goodQuantity";
import { sequenceS } from "fp-ts/lib/Apply";
import { left, right } from "fp-ts/lib/Either";
import { constant } from "fp-ts/lib/function";
import { WhatsAppButton } from "../WhatsAppButton.tsx/WhatsAppButton";
import { CopyLinkButton } from "../CopyLinkButton/CopyLinkButton";
import { PhoneButton } from "../PhoneButton/PhoneButton";

interface Props {
  onDismiss: () => unknown;
  selectedSupplier: SupplierData;
}

const defaultQuantity = constant(0);

function _PharmacyModal(props: Props) {
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
  const buttonSize = isMobile ? "small" : "medium";
  const phoneButton = pipe(
    selectedSupplier.phoneNumber,
    map(phoneNumber => <PhoneButton size={buttonSize} number={phoneNumber} />)
  );

  return (
    <Modal
      title={name || ""}
      onDismiss={option.some(props.onDismiss)}
      footer={some(
        isMobile ? (
          <Box width="100%">
            {pipe(phoneButton, toNullable)}
            <Space grow />
            <CopyLinkButton size={buttonSize} link={document.location.href} />
            <Space units={3} />
            <WhatsAppButton
              size={buttonSize}
              title={props.selectedSupplier.name}
              link={document.location.href}
            />
          </Box>
        ) : (
          <Box width="100%" hAlignContent="center">
            {pipe(
              phoneButton,
              map(pb => (
                <>
                  {pb}
                  <Space units={10} />
                </>
              )),
              toNullable
            )}
            <CopyLinkButton size={buttonSize} link={document.location.href} />
          </Box>
        )
      )}
    >
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
                fallbackMessage={formatMessage("PharmacyModal.neverUpdated")}
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
                fallbackMessage={formatMessage("PharmacyModal.neverUpdated")}
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

export const PharmacyModal = React.memo(_PharmacyModal);
