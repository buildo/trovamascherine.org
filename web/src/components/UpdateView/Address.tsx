import * as React from "react";
import { Subtitle } from "../Text/Subtitle";
import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import { SupplierData } from "../../domain";

export type Props = Omit<SupplierData, "supplies"> & {
  className?: string;
};

export function Address(props: Props) {
  return (
    <Subtitle size={2} className={props.className}>
      {props.address}
      {pipe(
        props.city,
        O.fold(
          () => "",
          city => `, ${city}`
        )
      )}{" "}
      - {props.cap}
      {pipe(
        props.province,
        O.fold(
          () => "",
          province => ` (${province})`
        )
      )}
    </Subtitle>
  );
}
