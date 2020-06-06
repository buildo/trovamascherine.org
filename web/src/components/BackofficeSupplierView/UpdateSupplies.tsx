import React, { useState } from "react";
import { SupplyData, SupplierData } from "../../domain";
import { SupplyInfoModal } from "./SupplyInfoModal";
import { UpdateViewForm, Values } from "./UpdateForm";
import { isNone, option, fold } from "fp-ts/lib/Option";
import * as TE from "fp-ts/lib/TaskEither";
import * as O from "fp-ts/lib/Option";
import { sequenceS } from "fp-ts/lib/Apply";
import { SupplierBackofficeStatus } from "./BackofficeSupplierView";
import { pipe } from "fp-ts/lib/pipeable";
import { isRight } from "fp-ts/lib/Either";
import { updateSupplyData, acceptTerms } from "../../API";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { Box } from "../Box/Box";
import * as classes from "./BackofficeSupplierView.treat";
import cx from "classnames";
import { InfoButton } from "../InfoButton/InfoButton";
import { useIsMobile } from "../../useMatchMedia";

type Props = {
  token: NonEmptyString;
  supplierData: SupplierData;
  lastUpdatedOn: O.Option<Date>;
  supplies: Values;
  setBackofficeStatus: React.Dispatch<
    React.SetStateAction<SupplierBackofficeStatus>
  >;
};

function toAPISupplies(values: Values): Array<SupplyData> {
  return [
    { good: "MascherinaFFP", quantity: values.mascherineFFP },
    { good: "MascherinaChirurgica", quantity: values.mascherineChirurgiche },
    { good: "MascherinaLavabile", quantity: values.mascherineLavabili },
    { good: "Gel", quantity: values.gel },
    { good: "Guanti", quantity: values.guanti },
    { good: "Termoscanner", quantity: values.scanner },
    { good: "Alchool", quantity: values.alchool },
    { good: "Pulsossimetro", quantity: values.pulsossimetri },
  ];
}

export function UpdateSuppliesView(props: Props) {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const isMobile = useIsMobile();

  const acceptedAll = sequenceS(option)({
    termsAcceptedOn: props.supplierData.termsAcceptedOn,
    privacyPolicyAcceptedOn: props.supplierData.privacyPolicyAcceptedOn,
  });

  return (
    <>
      <Box
        className={cx(classes.infoIcon, {
          [classes.infoIconMobile]: isMobile,
        })}
      >
        <InfoButton onClick={() => setShowInfoModal(true)} />
      </Box>
      {showInfoModal && (
        <SupplyInfoModal onDismiss={() => setShowInfoModal(false)} />
      )}
      <UpdateViewForm
        requireAcceptance={isNone(acceptedAll)}
        previousValues={props.supplies}
        onSubmit={values => {
          props.setBackofficeStatus({ status: "submitting" });
          pipe(
            acceptedAll,
            fold(
              () => acceptTerms(props.token),
              () => TE.right(undefined)
            ),
            TE.chain(() => updateSupplyData(props.token, toAPISupplies(values)))
          )().then(res => {
            if (isRight(res)) {
              props.setBackofficeStatus({
                status: "submitted",
                values,
                data: props.supplierData,
                lastUpdatedOn: props.lastUpdatedOn,
              });
            } else {
              props.setBackofficeStatus({ status: "error" });
            }
          });
        }}
      />
    </>
  );
}
