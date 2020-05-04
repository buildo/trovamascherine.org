import * as React from "react";
import { Monoid } from "fp-ts/lib/Monoid";
import { intercalate } from "fp-ts/lib/Foldable";
import { array } from "fp-ts/lib/Array";

type ReactChild = React.ReactElement<unknown> | string;

export interface ChildrenArray extends Array<Children> {}
export type ReactFragment = ChildrenArray;
export type Children = ReactChild | ReactFragment | boolean | null | undefined;

export const monoidChildren: Monoid<Children> = {
  empty: null,
  concat: (a, b) => (
    <>
      {a}
      {b}
    </>
  ),
};

export const intercalateChildren = intercalate(monoidChildren, array);
