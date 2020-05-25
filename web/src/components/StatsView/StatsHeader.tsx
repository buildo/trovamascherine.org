import * as React from "react";
import { useFormatMessage } from "../../intl";
import { Header } from "../Header/Header";

export function StatsHeader() {
  const formatMessage = useFormatMessage();
  return <Header>{formatMessage("App.name")}</Header>;
}
