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
import { UpdateSummary } from "./UpdateSummary";
import { GenericError } from "../Error/GenericError";
import { Loading } from "../Loading/Loading";
import { Header } from "../Header/Header";
import { InvalidTokenError } from "../Error/InvalidTokenError";
import { isNone, fold, option } from "fp-ts/lib/Option";
import * as TE from "fp-ts/lib/TaskEither";
import { sequenceS } from "fp-ts/lib/Apply";
import * as classes from "./UpdateView.treat";
import { InfoIcon } from "../Icons/InfoIcon";
import { SupplyInfoModal } from "./SupplyInfoModal";
import { useIsMobile } from "../../useMatchMedia";
import cx from "classnames";
import { Title } from "../Text/Title";
import { FormattedMessage, useFormatMessage } from "../../intl";
import { Space } from "../Space/Space";
import { Address } from "./Address";
import { Button } from "../Button/Button";

type Props = {
  token: NonEmptyString;
};

type HandledGood = Exclude<Good, "Mascherina">;
type HandledSupplyData = Omit<SupplyData, "good"> & {
  good: HandledGood;
};
function isHandledSupply(supply: SupplyData): supply is HandledSupplyData {
  return supply.good !== "Mascherina";
}

function toAPISupplies(values: Values): Array<SupplyData> {
  return [
    { good: "MascherinaFFP", quantity: values.mascherineFFP },
    { good: "MascherinaChirurgica", quantity: values.mascherineChirurgiche },
    { good: "Gel", quantity: values.gel },
    { good: "Guanti", quantity: values.guanti },
    { good: "Termoscanner", quantity: values.scanner },
  ];
}

function fromAPIGood(good: HandledGood): keyof Values {
  switch (good) {
    case "MascherinaFFP":
      return "mascherineFFP";
    case "MascherinaChirurgica":
      return "mascherineChirurgiche";
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
    supplies.filter(isHandledSupply).reduce(
      (acc, s) => ({
        ...acc,
        [fromAPIGood(s.good)]: s.quantity,
      }),
      {
        mascherineFFP: 0,
        mascherineChirurgiche: 0,
        gel: 0,
        guanti: 0,
        scanner: 0,
      }
    ),
    Values.decode,
    RD.fromEither,
    RD.mapLeft(() => genericError)
  );
}

export function UpdateView(props: Props): JSX.Element {
  const supplierData = useAPI(getSupplierDataByToken, props.token, eqString);
  const isMobile = useIsMobile();
  const formatMessage = useFormatMessage();
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
      return (
        <GenericError
          retry={() => window.location.reload()}
          error={new Error("Update failed")}
        />
      );
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
              <GenericError
                retry={() => window.location.reload()}
                error={new Error(err)}
              />
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
          <Box grow column={isMobile}>
            {!isMobile && <SupplierInfo {...status.supplier} />}
            <Box
              column
              hAlignContent="center"
              className={cx(classes.thankYou, {
                [classes.thankYouMobile]: isMobile,
              })}
            >
              <Title size={2}>
                <FormattedMessage id="UpdateView.thankYou" />
              </Title>
              <Space units={10} />
              {isMobile && (
                <>
                  {pipe(
                    status.supplier.name,
                    O.map(name => (
                      <>
                        <Title size={3}>{name}</Title>
                        <Space units={4} />
                      </>
                    )),
                    O.toNullable
                  )}
                  <Address {...status.supplier} />
                  <Space units={10} />
                </>
              )}
              <UpdateSummary values={status.values} />
              <Space units={10} />
              <Box>
                <Button
                  variant="primary"
                  action={() => window.location.reload()}
                  label={formatMessage("ThankYou.back")}
                  size="medium"
                />
              </Box>
            </Box>
          </Box>

          <Footer />
        </Box>
      );
  }
}
