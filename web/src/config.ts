import { pipe } from "fp-ts/lib/pipeable";
import { fold } from "fp-ts/lib/Either";
import { failure } from "io-ts/lib/PathReporter";
import * as t from "io-ts";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";

const Config = t.type(
  {
    REACT_APP_API_ENDPOINT: NonEmptyString,
    REACT_APP_METABASE_URL: NonEmptyString,
    REACT_APP_MAPBOX_API_KEY: NonEmptyString,
    REACT_APP_VERSION: NonEmptyString,
    REACT_APP_CITIZEN_FEEDBACK_FORM_ID: NonEmptyString,
    REACT_APP_SUPPLIER_FEEDBACK_FORM_ID: NonEmptyString,
  },
  "Config"
);

export const config = pipe(
  process.env,
  Config.decode,
  fold(
    errors => {
      throw new Error(["Invalid config provided:", failure(errors)].join("\n"));
    },
    env => ({
      apiEndpoint: env.REACT_APP_API_ENDPOINT,
      dataStudioUrl: env.REACT_APP_METABASE_URL,
      mapboxApiKey: env.REACT_APP_MAPBOX_API_KEY,
      appVersion: env.REACT_APP_VERSION,
      citizenFeedbackFormId: env.REACT_APP_CITIZEN_FEEDBACK_FORM_ID,
      supplierFeedbackFormId: env.REACT_APP_SUPPLIER_FEEDBACK_FORM_ID,
    })
  )
);
