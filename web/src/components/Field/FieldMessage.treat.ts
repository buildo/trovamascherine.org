import { styleMap } from "treat";
import * as vars from "../../variables";

export const fieldMessage = styleMap({
  negative: {
    color: vars.red01,
  },
});

export type FieldMessageType = keyof typeof fieldMessage;
