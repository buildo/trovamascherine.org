import React from "react";
import { option } from "fp-ts";
import { Box } from "../Box/Box";
import { Title } from "../Text/Title";
import GoodStatusDetails from "../GoodStatusDetails";
import { Modal } from "../Modal/Modal";
import { SupplierData } from "../../domain";
import * as classes from "./PharmacyModalContent.treat";
import { pipe } from "fp-ts/lib/pipeable";
import { toNullable, fold, isSome } from "fp-ts/lib/Option";
import { findFirst } from "fp-ts/lib/Array";
import { getOrElse } from "fp-ts/lib/Option";
import { Space } from "../Space/Space";
import { LastUpdate } from "../UpdateView/LastUpdate";
import { useFormatMessage } from "../../intl";
import { PharmaQuestionMarkIcon } from "../Icons/PharmaQuestionMarkIcon";
import { Label } from "../Text/Label";
import { SupportEmailLink } from "../SupportEmailLink/SupportEmailLink";

interface Supply {
  good: "Mascherina" | "Guanti" | "Gel" | "Termoscanner";
  quantity: number;
}

interface IPharmacyModalContentProps {
  onDismiss: () => unknown;
  selectedSupplier: SupplierData;
}

function PharmacyModalContent(props: IPharmacyModalContentProps) {
  const { selectedSupplier } = props;
  const { supplies } = selectedSupplier;
  const name = pipe(selectedSupplier.name, toNullable);
  const formatMessage = useFormatMessage();

  const mascherina = pipe(
    supplies,
    findFirst(a => a.good === "Mascherina"),
    getOrElse(() => {
      return {
        good: "Mascherina",
        quantity: 0,
      };
    })
  );

  const glove = pipe(
    supplies,
    findFirst(supply => supply.good === "Guanti"),
    getOrElse(() => {
      return {
        good: "Guanti",
        quantity: 0,
      };
    })
  );

  const gel = pipe(
    supplies,
    findFirst(supply => supply.good === "Gel"),
    getOrElse(() => {
      return {
        good: "Gel",
        quantity: 0,
      };
    })
  );

  const termoScanner = pipe(
    supplies,
    findFirst(supply => supply.good === "Termoscanner"),
    getOrElse(() => {
      return {
        good: "Termoscanner",
        quantity: 0,
      };
    })
  );

  return (
    <Modal onDismiss={option.some(props.onDismiss)}>
      <Box column width="100%">
        {name ? (
          <Title className={classes.pharmacyName} size={4}>
            {name}
          </Title>
        ) : null}

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
        <Box
          className={classes.pharmacyGoodListing}
          hAlignContent="center"
          vAlignContent="center"
          width="100%"
          column
        >
          {isSome(selectedSupplier.lastUpdatedOn) ? (
            <>
              <Box className={classes.pharmacyGoodListingRow}>
                <GoodStatusDetails {...(mascherina as Supply)} />
                <GoodStatusDetails {...(gel as Supply)} />
              </Box>
              <Box className={classes.pharmacyGoodListingRow}>
                <GoodStatusDetails {...(glove as Supply)} />
                <GoodStatusDetails {...(termoScanner as Supply)} />
              </Box>
              <Space units={5} />
              <LastUpdate
                value={selectedSupplier.lastUpdatedOn}
                fallbackMessage={formatMessage(
                  "PharmacyModalContent.neverUpdated"
                )}
              />
            </>
          ) : (
            <>
              <Space units={8} />
              <PharmaQuestionMarkIcon width={76} height={76} />
              <Space units={8} />
              <LastUpdate
                value={selectedSupplier.lastUpdatedOn}
                fallbackMessage={formatMessage(
                  "PharmacyModalContent.neverUpdated"
                )}
              />
              <Space units={5} />
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
