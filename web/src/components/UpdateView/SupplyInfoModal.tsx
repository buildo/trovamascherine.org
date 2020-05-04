import * as React from "react";
import * as O from "fp-ts/lib/Option";
import { Box } from "../Box/Box";
import { Modal } from "../Modal/Modal";
import { Space } from "../Space/Space";
import { Title } from "../Text/Title";
import { Text } from "../Text/Text";
import { Label } from "../Text/Label";
import { Link } from "../Link/Link";

type Props = {
  onDismiss: () => unknown;
};

export function SupplyInfoModal(props: Props): JSX.Element {
  return (
    <Modal onDismiss={O.some(props.onDismiss)}>
      <Box column width="100%">
        <Title size={3}>Mascherine</Title>
        <Space units={4} />
        <Text size={2}>
          Inserire la somma delle unità - non delle confezioni - di mascherine
          chirurgiche, mascherine FFP2, mascherine FFP3 disponibili alla vendita
          nella farmacia.
        </Text>
        <Text size={2}>
          Non inserire le mascherine non disponibili alla vendita, pre-ordinate
          da clienti e/o non conformi con gli standard di protezione approvati
          dall’INAIL.
        </Text>
        <Space units={8} />
        <Label size={2}>
          Esempio: la farmacia ha 70 mascherine chirurgiche disponibili alla
          vendita, 30 mascherine FFP2 e 0 mascherine FFP3. La farmacia ha anche
          un ordine da parte di un cliente di 20 mascherine FFP2 da ritirare in
          giornata. Inserire nel campo dati: 60 (70 mascherine chirurgiche + 30
          FFP2 - 20 pre-ordinate)
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
