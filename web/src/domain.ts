import * as t from "io-ts";
import { DateFromISOString } from "io-ts-types/lib/DateFromISOString";
import { optionFromNullable } from "io-ts-types/lib/optionFromNullable";

export const Good = t.keyof(
  {
    Mascherina: true,
    MascherinaFFP: true,
    MascherinaChirurgica: true,
    Guanti: true,
    Gel: true,
    Termoscanner: true,
  },
  "Good"
);
export type Good = t.TypeOf<typeof Good>;

export const SupplyData = t.type(
  {
    good: Good,
    quantity: t.number,
  },
  "SupplyData"
);
export type SupplyData = t.TypeOf<typeof SupplyData>;

export const SupplierData = t.type(
  {
    id: t.string,
    latitude: t.number,
    longitude: t.number,
    address: t.string,
    cap: t.string,
    name: optionFromNullable(t.string),
    lastUpdatedOn: optionFromNullable(DateFromISOString),
    supplies: t.array(SupplyData),
    city: optionFromNullable(t.string),
    province: optionFromNullable(t.string),
    termsAcceptedOn: optionFromNullable(DateFromISOString),
    privacyPolicyAcceptedOn: optionFromNullable(DateFromISOString),
  },
  "SupplierData"
);
export type SupplierData = t.TypeOf<typeof SupplierData>;
