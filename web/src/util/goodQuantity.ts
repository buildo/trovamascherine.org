import { Good, SupplyData } from "../domain";
import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";
import { findFirst } from "fp-ts/lib/Array";

export function findByGood(
  good: Good,
  supplies: Array<SupplyData>
): option.Option<SupplyData> {
  return pipe(
    supplies,
    findFirst(s => s.good === good)
  );
}

export function quantityByGood(
  good: Good,
  supplies: Array<SupplyData>
): option.Option<number> {
  return pipe(
    findByGood(good, supplies),
    option.map(g => g.quantity)
  );
}
