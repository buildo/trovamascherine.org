import * as t from "io-ts";
import { DateFromISOString } from "io-ts-types/lib/DateFromISOString";
import { optionFromNullable } from "io-ts-types/lib/optionFromNullable";
import { UUID } from "io-ts-types/lib/UUID";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";

export const Good = t.keyof(
  {
    Mascherina: true,
    MascherinaFFP: true,
    MascherinaChirurgica: true,
    MascherinaLavabile: true,
    Guanti: true,
    Gel: true,
    Termoscanner: true,
    Alchool: true,
    Pulsossimetro: true,
  },
  "Good"
);
export type Good = t.TypeOf<typeof Good>;

export const NotificationFrequency = t.keyof(
  {
    TwicePerDay: true,
    ThricePerWeek: true,
    OncePerWeek: true,
  },
  "NotificationFrequency"
);
export type NotificationFrequency = t.TypeOf<typeof NotificationFrequency>;

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
    id: UUID,
    latitude: t.number,
    longitude: t.number,
    address: t.string,
    cap: t.string,
    name: optionFromNullable(t.string),
    city: optionFromNullable(t.string),
    province: optionFromNullable(t.string),
    phoneNumber: optionFromNullable(NonEmptyString),
    termsAcceptedOn: optionFromNullable(DateFromISOString),
    privacyPolicyAcceptedOn: optionFromNullable(DateFromISOString),
  },
  "SupplierData"
);
export type SupplierData = t.TypeOf<typeof SupplierData>;

export const SupplierConfig = t.type(
  {
    showPhoneNumber: t.boolean,
    notificationFrequency: NotificationFrequency,
  },
  "SupplierConfig"
);
export type SupplierConfig = t.TypeOf<typeof SupplierConfig>;

export const FrontOfficeSupplier = t.type({
  data: SupplierData,
  lastUpdatedOn: optionFromNullable(DateFromISOString),
  supplies: t.array(SupplyData),
});
export type FrontOfficeSupplier = t.TypeOf<typeof FrontOfficeSupplier>;

export const Supplier = t.type({
  data: SupplierData,
  lastUpdatedOn: optionFromNullable(DateFromISOString),
  supplies: t.array(SupplyData),
  config: SupplierConfig,
});
export type Supplier = t.TypeOf<typeof Supplier>;

export const SupplierDataUpdate = t.type(
  {
    phoneNumber: optionFromNullable(t.string),
  },
  "SupplierDataUpdate"
);
export type SupplierDataUpdate = t.TypeOf<typeof SupplierDataUpdate>;
