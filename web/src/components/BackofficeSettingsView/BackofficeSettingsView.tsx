import * as React from "react";
import { Box } from "../Box/Box";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { SupplierInfo } from "../SupplierInfo/SupplierInfo";
import {
  getSupplierByToken,
  updateSupplierConfig,
  updateSupplierData,
} from "../../API";
import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import { useAPI } from "../../useAPI";
import { eqString } from "fp-ts/lib/Eq";
import * as RD from "../../RemoteData";
import { Footer } from "../Footer/Footer";
import { GenericError } from "../Error/GenericError";
import { Loading } from "../Loading/Loading";
import { Header } from "../Header/Header";
import { InvalidTokenError } from "../Error/InvalidTokenError";
import { useIsMobile } from "../../useMatchMedia";
import { SupplierSettings } from "./SupplierSettings";

type Props = {
  token: NonEmptyString;
};

export function BackofficeSettingsView(props: Props): JSX.Element {
  const supplierData = useAPI(getSupplierByToken, props.token, eqString);
  const isMobile = useIsMobile();

  return pipe(
    supplierData,
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
              {!isMobile && (
                <SupplierInfo {...supplier} onEditSettings={O.none} />
              )}
              <SupplierSettings
                supplierConfig={supplier.config}
                supplierData={supplier.data}
                onSaveSupplierConfig={config =>
                  updateSupplierConfig(props.token, config)
                }
                onSaveSupplierData={data =>
                  updateSupplierData(props.token, data)
                }
              />
            </Box>
            <Footer />
          </Box>
        );
      }
    )
  );
}
