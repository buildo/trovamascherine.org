import * as React from "react";
import { Box } from "../Box/Box";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { SupplierInfo } from "./SupplierInfo";
import { UpdateViewForm, Values } from "./UpdateViewForm";
import {
  updateSupplyData,
  getSupplierDataByToken,
  GetSupplierDataByTokenError,
  genericError,
  acceptTerms,
} from "../../API";
import { SupplyData, Good, SupplierData } from "../../domain";
import { isRight } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import { useAPI } from "../../useAPI";
import { eqString } from "fp-ts/lib/Eq";
import * as RD from "../../RemoteData";
import { Footer } from "../Footer/Footer";
import { ThankYou } from "./ThankYou";
import { GenericError } from "../GenericError/GenericError";
import { Loading } from "../Loading/Loading";
import { Header } from "../Header/Header";
import { InvalidTokenError } from "../GenericError/InvalidTokenError";
import { isNone, fold, option } from "fp-ts/lib/Option";
import * as TE from "fp-ts/lib/TaskEither";
import { sequenceS } from "fp-ts/lib/Apply";
import * as classes from "./UpdateView.treat";
import { InfoIcon } from "../Icons/InfoIcon";
import { SupplyInfoModal } from "./SupplyInfoModal";
import { useIsMobile } from "../../useMatchMedia";
import cx from "classnames";

type Props = {
  token: NonEmptyString;
};

function toAPISupplies(values: Values): Array<SupplyData> {
  return [
    { good: "Mascherina", quantity: values.mascherine },
    { good: "Gel", quantity: values.gel },
    { good: "Guanti", quantity: values.guanti },
    { good: "Termoscanner", quantity: values.scanner },
  ];
}

function fromAPIGood(good: Good): keyof Values {
  switch (good) {
    case "Mascherina":
      return "mascherine";
    case "Gel":
      return "gel";
    case "Guanti":
      return "guanti";
    case "Termoscanner":
      return "scanner";
  }
}

function fromAPISupplies(
  supplies: Array<SupplyData>
): RD.RemoteData<GetSupplierDataByTokenError, Values> {
  return pipe(
    supplies.reduce(
      (acc, s) => ({
        ...acc,
        [fromAPIGood(s.good)]: s.quantity,
      }),
      { mascherine: 0, gel: 0, guanti: 0, scanner: 0 }
    ),
    Values.decode,
    RD.fromEither,
    RD.mapLeft(() => genericError)
  );
}

export function UpdateView(props: Props): JSX.Element {
  const supplierData = useAPI(getSupplierDataByToken, props.token, eqString);
  const isMobile = useIsMobile();
  const [showInfoModal, setShowInfoModal] = React.useState(false);
  const [status, setStatus] = React.useState<
    | { status: "form" }
    | { status: "submitting" }
    | { status: "error" }
    | {
        status: "submitted";
        values: Values;
        supplier: Omit<SupplierData, "supplies">;
      }
  >({ status: "form" });

  switch (status.status) {
    case "error":
      return <GenericError retry={() => window.location.reload()} />;
    case "form":
      return pipe(
        supplierData,
        RD.chain(supplier =>
          pipe(
            fromAPISupplies(supplier.supplies),
            RD.map(supplies => ({ ...supplier, supplies }))
          )
        ),
        RD.fold(
          () => <Loading />,
          err => {
            return err === "InvalidToken" ? (
              <InvalidTokenError />
            ) : (
              <GenericError retry={() => window.location.reload()} />
            );
          },
          supplier => {
            const acceptedAll = sequenceS(option)({
              termsAcceptedOn: supplier.termsAcceptedOn,
              privacyPolicyAcceptedOn: supplier.privacyPolicyAcceptedOn,
            });
            return (
              <Box column height="100%">
                <Header />
                <Box grow column={isMobile}>
                  <SupplierInfo {...supplier} />
                  <Box
                    className={cx(classes.infoIcon, {
                      [classes.infoIconMobile]: isMobile,
                    })}
                    onClick={() => setShowInfoModal(true)}
                  >
                    <InfoIcon width={44} height={44} />
                  </Box>

                  {showInfoModal && (
                    <SupplyInfoModal
                      onDismiss={() => setShowInfoModal(false)}
                    />
                  )}
                  <UpdateViewForm
                    requireAcceptance={isNone(acceptedAll)}
                    previousValues={supplier.supplies}
                    onSubmit={values => {
                      setStatus({ status: "submitting" });
                      pipe(
                        acceptedAll,
                        fold(
                          () => acceptTerms(props.token),
                          () => TE.right(undefined)
                        ),
                        TE.chain(() =>
                          updateSupplyData(props.token, toAPISupplies(values))
                        )
                      )().then(res => {
                        if (isRight(res)) {
                          setStatus({ status: "submitted", values, supplier });
                        } else {
                          setStatus({ status: "error" });
                        }
                      });
                    }}
                  />
                </Box>
                <Footer />
              </Box>
            );
          }
        )
      );
    case "submitting":
      return <Loading />;
    case "submitted":
      return (
        <Box column height="100%">
          <Header />
          {isMobile ? (
            <ThankYou
              values={status.values}
              supplier={O.some(status.supplier)}
              back={() => window.location.reload()}
            />
          ) : (
            <Box grow>
              <SupplierInfo {...status.supplier} />
              <ThankYou
                values={status.values}
                supplier={O.none}
                back={() => window.location.reload()}
              />
            </Box>
          )}

          <Footer />
        </Box>
      );
  }
}
