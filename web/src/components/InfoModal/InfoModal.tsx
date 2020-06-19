import * as React from "react";
import { option } from "fp-ts";
import { Modal } from "../Modal/Modal";
import * as classes from "./InfoModal.treat";
import { Box } from "../Box/Box";

import { Text } from "../Text/Text";

import { Link } from "../Link/Link";
import { Space } from "../Space/Space";
import { FormattedMessage } from "../../intl";
import { none } from "fp-ts/lib/Option";
import { useIsMobile } from "../../useMatchMedia";
import { intercalateChildren } from "../../util";

type Props = {
  onDismiss: () => unknown;
};

export function InfoModal(props: Props) {
  const isMobile = useIsMobile();
  const footerSpace = isMobile ? null : <Space units={3} />;
  return (
    <Modal
      title="Chi siamo"
      onDismiss={option.some(props.onDismiss)}
      footer={none}
    >
      <Box width="100%" column>
        <Text size={2} className={classes.text}>
          Trovamascherine.org è un progetto senza scopo di lucro nato con lo
          scopo di fornire, in maniera sicura, veloce e gratuita, un servizio ai
          cittadini per trovare nella propria zona dispositivi come mascherine,
          gel disinfettanti, guanti monouso e termoscanner.
        </Text>
        <Space units={8} />
        <Text size={2} className={classes.text}>
          Il sito web fornisce l’aggiornamento giornaliero della disponibilità
          di ciascun prodotto da parte di ogni Farmacia e Parafarmacia italiana
          aderente all’iniziativa.
        </Text>
        <Space units={8} />
        <Text size={2} className={classes.text}>
          Trovamascherine.org è un progetto nato da un gruppo di professionisti
          italiani in collaborazione con{" "}
          <Link href="https://www.buildo.io/">buildo.io</Link> e con il
          Patrocinio di FOFI, Federfarma, FNPI, UNaFTiSP, MNLF, CULPI,
          Federfardis, CONASFA.
        </Text>
        <Space units={8} />
        <Text size={2} className={classes.text}>
          Il progetto è stato sviluppato grazie alla generosità e passione di{" "}
          <Link href="credits.html">più di 20 professionisti</Link> italiani, e
          cresce grazie al costante contributo da parte delle Farmacie e
          Parafarmacie aderenti ma anche al supporto attivo dei cittadini che ci
          supportano quotidianamente nella promozione del progetto nelle loro
          città di riferimento.
        </Text>
        <Space units={8} />
        <div>
          <Text size={2}>PER SUPPORTO: </Text>
          <Link href="mailto:supporto@trovamascherine.org">
            supporto@trovamascherine.org
          </Link>
          <br />
          <Text size={2}>CONTATTI: </Text>
          <Link href="mailto:comunicazione@trovamascherine.org">
            comunicazione@trovamascherine.org
          </Link>
        </div>

        <Space units={8} />
        <Box
          column={isMobile}
          hAlignContent="center"
          className={classes.tosBlock}
        >
          {intercalateChildren(footerSpace, [
            <Link className={classes.tosBlockLink} href="/dashboard">
              Dashboard dati
            </Link>,
            <Link
              className={classes.tosBlockLink}
              target="_blank"
              href="/terms-and-conditions.pdf"
            >
              Termini e Condizioni
            </Link>,
            <Link
              className={classes.tosBlockLink}
              target="_blank"
              href="/privacy-policy.pdf"
            >
              Privacy Policy
            </Link>,
            <Link
              className={classes.tosBlockLink}
              target="_blank"
              href="/cookie-policy.pdf"
            >
              Cookie Policy
            </Link>,
            <Link className={classes.tosBlockLink} href="/credits">
              <FormattedMessage id="InfoModal.credits" />
            </Link>,
          ])}
        </Box>
      </Box>
    </Modal>
  );
}
