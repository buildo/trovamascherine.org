import * as React from "react";
import * as O from "fp-ts/lib/Option";
import { Box } from "../Box/Box";
import { Modal } from "../Modal/Modal";
import { Space } from "../Space/Space";
import { Title } from "../Text/Title";
import { Text } from "../Text/Text";
import { Label } from "../Text/Label";
import { Link } from "../Link/Link";
import { useFormatMessage } from "../../intl";

type Props = {
  onDismiss: () => unknown;
};

export function SupplyInfoModal(props: Props): JSX.Element {
  const formatMessage = useFormatMessage();
  return (
    <Modal
      title={formatMessage("SupplyInfoModal.title")}
      onDismiss={O.some(props.onDismiss)}
      footer={O.none}
    >
      <Box column width="100%">
        <Title size={3}>Mascherine</Title>
        <Space units={2} />
        <Title size={5}>Chirurgiche e di “comunità”</Title>
        <Space units={2} />
        <Text size={2}>
          Inserire la somma delle unità - non delle confezioni - di mascherine
          chirurgiche e di “comunità” disponibili alla vendita nella farmacia.
          Non inserire le mascherine non disponibili alla vendita, pre-ordinate
          da clienti e/o non conformi con gli standard di protezione approvati
          dall’INAIL.
        </Text>
        <Space units={4} />
        <Label size={2}>
          Esempio: La farmacia ha 1000 mascherine chirurgiche e 2000 mascherine
          di comunità. La farmacia ha anche un ordine da parte di un cliente per
          500 mascherine chirurgiche da ritirare in giornata. Inserire nel campo
          dati: 2500 (1000 mascherine chirurgiche + 2000 di comunità - 500
          pre-ordinate)
        </Label>
        <Space units={4} />
        <Title size={5}>FFP1, FFP2, FFP3</Title>
        <Space units={2} />
        <Text size={2}>
          Inserire la somma delle unità - non delle confezioni - di mascherine
          FFP1, FFP2, FFP3, con o senza valvola, disponibili alla vendita nella
          farmacia. Non inserire le mascherine non disponibili alla vendita,
          pre-ordinate da clienti e/o non conformi con gli standard di
          protezione approvati dall’INAIL.
        </Text>
        <Space units={4} />
        <Label size={2}>
          Esempio: La farmacia ha 500 mascherine FFP2 e 400 FFP3. La farmacia ha
          anche un ordine da parte di un cliente per 300 mascherine FFP2 da
          ritirare in giornata. Inserire nel campo dati: 600 (500 mascherine
          FFP2 + 400 FFP3 - 300 pre-ordinate)
        </Label>

        <Space units={10} />

        <Title size={3}>Gel Disinfettante</Title>
        <Space units={4} />
        <Text size={2}>
          Inserire la somma delle unità - non delle confezioni - di gel
          disinfettante disponibile alla vendita. Non inserire i gel
          disinfettanti non disponibili alla vendita e/o pre-ordinati da
          clienti.
        </Text>

        <Space units={10} />

        <Title size={3}>Guanti Monouso</Title>
        <Space units={4} />
        <Text size={2}>
          Inserire la somma delle unità - non delle confezioni - di paia di
          guanti monouso disponibili alla vendita. Non inserire i guanti non
          disponibili alla vendita e/o pre-ordinati da clienti.
        </Text>

        <Space units={10} />

        <Title size={3}>Termoscanner</Title>
        <Space units={4} />
        <Text size={2}>
          Inserire la somma delle unità di termoscanner disponibili alla
          vendita. Non inserire i termoscanner non disponibili alla vendita e/o
          pre-ordinati da clienti.
        </Text>

        <Space units={10} />

        <Label size={2}>
          Per ulteriori informazioni sui Dispositivi di Protezione Individuale
          puoi consultare l'apposita sezione del sito INAIL{" "}
          <Link
            target="_blank"
            href="http://www.inail.it/cs/internet/comunicazione/news-ed-eventi/news/news-elenco-dpi-validati-inail-2020.html"
          >
            www.inail.it/cs/internet/comunicazione/news-ed-eventi/news/news-elenco-dpi-validati-inail-2020.html
          </Link>
        </Label>
      </Box>
    </Modal>
  );
}
