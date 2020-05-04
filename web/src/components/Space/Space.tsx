import * as React from "react";
import * as vars from "../../variables";
import { Box } from "../Box/Box";

type Props =
  | {
      /**
       * How many units to fill along the main axis
       */
      units: number;
    }
  | {
      /**
       * Whether the space should "grow" and fill all the available space along the main axis
       */
      grow: true;
    };

export function Space(props: Props) {
  return (
    <Box
      basis={"units" in props ? props.units * vars.spaceUnit : undefined}
      grow={"grow" in props ? true : false}
      shrink={"grow" in props ? true : false}
    />
  );
}
