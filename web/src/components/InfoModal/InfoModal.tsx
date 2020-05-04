import * as React from "react";
import { option } from "fp-ts";
import { Modal } from "../Modal/Modal";
import * as classes from "./InfoModal.treat";
import { Box } from "../Box/Box";

import { Text } from "../Text/Text";

import { Link } from "../Link/Link";
import { Space } from "../Space/Space";
import { useFormatMessage, FormattedMessage } from "../../intl";

type Props = {
  onDismiss: () => unknown;
};

export function InfoModal(props: Props) {
  const formatMessage = useFormatMessage();

  return (
    <Modal onDismiss={option.some(props.onDismiss)}>
      <Box width="100%" column>
        <Text size={2} className={classes.text}>
          Benvenuta/o in trovamascherine.org!
        </Text>
        <Space units={8} />
        <Text size={2} className={classes.text}>
          Trovamascherine.org è un progetto senza scopo di lucro nato con lo
          scopo di fornire, in maniera sicura, veloce e gratuita, un servizio ai
          cittadini per trovare nella propria zona dispositivi come mascherine,
          gel disinfettanti, guanti monouso e termoscanner.
        </Text>
        <Space units={8} />
        <Text size={2} className={classes.text}>
          L’app e il sito web forniscono un database aggiornato giornalmente
          della disponibilità di dispositivi per ciascuna farmacia d’Italia.
        </Text>
        <Space units={8} />
        <Text size={2} className={classes.text}>
          Trovamascherine.org è un progetto nato da un gruppo di professionisti
          italiani in collaborazione con{" "}
          <Link href="https://www.buildo.io/">buildo.io</Link> e{" "}
          <Link href="https://www.fapnet.it/">
            Farmacisti Associati Piemonte
          </Link>{" "}
          . Il progetto è stato sviluppato grazie alla generosità di{" "}
          <Link href="credits.html">molti volontari</Link>, in maniera gratuita.
        </Text>
        <Space units={4} />

        <Box column hAlignContent="center">
          <Text size={3} className={classes.text}>
            {formatMessage("Footer.contactUs")}
          </Text>
          <Link href={`mailto:${formatMessage("Footer.email")}`}>
            {formatMessage("Footer.email")}
          </Link>
        </Box>

        <Space units={8} />
        <Box column className={classes.tosBlock}>
          <Link className={classes.tosBlockLink} href="/dashboard">
            Dashboard dati
          </Link>
          <Link
            className={classes.tosBlockLink}
            target="_blank"
            href="/terms-and-conditions.pdf"
          >
            Termini e Condizioni
          </Link>
          <Link
            className={classes.tosBlockLink}
            target="_blank"
            href="/privacy-policy.pdf"
          >
            Privacy Policy
          </Link>
          <Link
            className={classes.tosBlockLink}
            target="_blank"
            href="/cookie-policy.pdf"
          >
            Cookie Policy
          </Link>
          <Link className={classes.tosBlockLink} href="/credits">
            <FormattedMessage id="InfoModal.credits" />
          </Link>
        </Box>
      </Box>
    </Modal>
  );
}
