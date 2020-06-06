import * as React from "react";
import { Box } from "../Box/Box";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { SupplierInfo } from "../SupplierInfo/SupplierInfo";
import { Values } from "./UpdateForm";
import {
  getSupplierByToken,
  GetSupplierByTokenError,
  genericError,
} from "../../API";
import { SupplyData, Good, SupplierData } from "../../domain";
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
import * as classes from "./BackofficeSupplierView.treat";
import { useIsMobile } from "../../useMatchMedia";
import cx from "classnames";
import { Title } from "../Text/Title";
import { FormattedMessage, useFormatMessage } from "../../intl";
import { Space } from "../Space/Space";
import { Address } from "../SupplierInfo/Address";
import { Button } from "../Button/Button";
import { UpdateSuppliesView } from "./UpdateSupplies";

type Props = {
  token: NonEmptyString;
  goToSettings: () => unknown;
};

type HandledGood = Exclude<Good, "Mascherina">;
type HandledSupplyData = Omit<SupplyData, "good"> & {
  good: HandledGood;
};

function isHandledSupply(supply: SupplyData): supply is HandledSupplyData {
  return supply.good !== "Mascherina";
}

function fromAPIGood(good: HandledGood): keyof Values {
  switch (good) {
    case "MascherinaFFP":
      return "mascherineFFP";
    case "MascherinaChirurgica":
      return "mascherineChirurgiche";
    case "MascherinaLavabile":
      return "mascherineLavabili";
    case "Gel":
      return "gel";
    case "Guanti":
      return "guanti";
    case "Termoscanner":
      return "scanner";
    case "Alchool":
      return "alchool";
    case "Pulsossimetro":
      return "pulsossimetri";
  }
}

function fromAPISupplies(
  supplies: Array<SupplyData>
): RD.RemoteData<GetSupplierByTokenError, Values> {
  return pipe(
    supplies.filter(isHandledSupply).reduce(
      (acc, s) => ({
        ...acc,
        [fromAPIGood(s.good)]: s.quantity,
      }),
      {
        mascherineFFP: 0,
        mascherineChirurgiche: 0,
        mascherineLavabili: 0,
        gel: 0,
        guanti: 0,
        scanner: 0,
        alchool: 0,
        pulsossimetri: 0,
      }
    ),
    Values.decode,
    RD.fromEither,
    RD.mapLeft(() => genericError)
  );
}

export type SupplierBackofficeStatus =
  | { status: "form" }
  | { status: "submitting" }
  | { status: "error" }
  | {
      status: "submitted";
      values: Values;
      data: SupplierData;
      lastUpdatedOn: O.Option<Date>;
    };

export function BackofficeSupplierView(props: Props): JSX.Element {
  const supplierData = useAPI(getSupplierByToken, props.token, eqString);
  const isMobile = useIsMobile();
  const formatMessage = useFormatMessage();
  const [status, setStatus] = React.useState<SupplierBackofficeStatus>({
    status: "form",
  });

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
            return (
              <Box column height="100%">
                <Header />
                <Box grow column={isMobile}>
                  <SupplierInfo
                    {...supplier}
                    onEditSettings={O.some(props.goToSettings)}
                  />
                  <UpdateSuppliesView
                    token={props.token}
                    supplierData={supplier.data}
                    supplies={supplier.supplies}
                    lastUpdatedOn={supplier.lastUpdatedOn}
                    setBackofficeStatus={setStatus}
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
            {!isMobile && <SupplierInfo {...status} onEditSettings={O.none} />}
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
                    status.data.name,
                    O.map(name => (
                      <>
                        <Title size={3}>{name}</Title>
                        <Space units={4} />
                      </>
                    )),
                    O.toNullable
                  )}
                  <Address {...status.data} />
                  <Space units={10} />
                </>
              )}
              <UpdateSummary values={status.values} />
              <Space units={10} />
              <Box>
                <Button
                  variant="primary"
                  size="medium"
                  action={() => window.location.reload()}
                  label={formatMessage("ThankYou.back")}
                  icon={O.none}
                />
              </Box>
            </Box>
          </Box>
          <Footer />
        </Box>
      );
  }
}
