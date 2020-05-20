import * as React from "react";
import { Box } from "../Box/Box";
import { Header } from "../Header/Header";
import { BackLink } from "../Link/BackLink";
import { contentTop, contentBottom } from "./CreditsView.treat";
import { Space } from "../Space/Space";
import { Title } from "../Text/Title";
import { FormattedMessage } from "../../intl";
import { Text } from "../Text/Text";
import { intercalateChildren } from "../../util";
import { Footer } from "../Footer/Footer";

const names = [
  "Riccardo Ancona",
  "Stefano Baghino",
  "Claudio Caletti",
  "Andrea Casasco",
  "Luca Cioria",
  "Giovanni Fassio",
  "Daniele Gallingani",
  "Enrico Goitre",
  "Giovanni Gonzaga",
  "Vincenzo Guerrisi",
  "Aurora Incardona",
  "Alex Morlini",
  "Stefano Orlando",
  "Gabriele Petronella",
  "Tommaso Petrucciani",
  "Silvia Riva",
  "Lucio Scudiero",
  "Fulvio Talluto",
  "Matteo Turri",
];

export function CreditsView() {
  return (
    <Box column>
      <Header />
      <Box width="100%" column className={contentTop}>
        <BackLink />
        <Space units={6} />
        <Box column hAlignContent="center">
          <Title size={3}>
            <FormattedMessage id="CreditsView.title" />
          </Title>
          <Space units={2} />
          <Text size={2}>
            <FormattedMessage id="CreditsView.message" />
          </Text>
        </Box>
      </Box>
      <Box width="100%" column hAlignContent="center" className={contentBottom}>
        {intercalateChildren(<Space units={2} />, names)}
      </Box>
      <Footer />
    </Box>
  );
}
