import * as React from "react";
import { Subtitle } from "../Text/Subtitle";
import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import { SupplierData } from "../../domain";
import * as classes from "./Address.treat";

export type Props = SupplierData & {
  dark?: true;
};

export function Address(props: Props) {
  return (
    <Subtitle size={2} className={props.dark ? classes.dark : undefined}>
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
