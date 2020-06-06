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
        <Title size={6}>Chirurgiche / Protezione Civile</Title>
        <Space units={2} />
        <Text size={2}>
          Inserire la somma delle singole unità di mascherine chirurgiche
          conformi a quelle indicate nell’Ordinanza 11/2020 emessa dal
          Commissario Straordinario per l’Emergenza Covid-19 (quelle cosiddette
          “della Protezione Civile”). Non inserire le mascherine non conformi
          con gli standard dell’Ordinanza, pre-ordinate da clienti, o non
          disponibili alla vendita.
        </Text>
        <Space units={4} />
        <Title size={6}>FFP2, FFP3, KN95, N95</Title>
        <Space units={2} />
        <Text size={2}>
          Inserire la somma delle singole unità di mascherine FFP2, FFP3, KN95,
          N95, con o senza valvola, disponibili alla vendita nella farmacia. Non
          inserire le mascherine pre-ordinate da clienti, non conformi, o non
          disponibili alla vendita.
        </Text>
        <Space units={4} />
        <Title size={6}>Lavabili e altre tipologie</Title>
        <Space units={2} />
        <Text size={2}>
          Inserire la somma delle singole unità delle mascherine lavabili e di
          altre categorie di protezioni facciali autorizzate alla vendita nelle
          farmacie e parafarmacie. Non inserire protezioni pre-ordinate da
          clienti, non conformi, o non disponibili alla vendita.
        </Text>

        <Space units={10} />

        <Title size={3}>Alchool Etilico Denaturato</Title>
        <Space units={4} />
        <Text size={2}>
          Inserire la somma delle singole unità di alcol etilico denaturato
          disponibili alla vendita. Non inserire confenzioni pre-ordinate o non
          disponibili alla vendita.
        </Text>

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

        <Title size={3}>Pulsossimetri</Title>
        <Space units={4} />
        <Text size={2}>
          Inserire la somma delle unità di pulsossimetri disponibili alla
          vendita. Non inserire i pulsossimetri non disponibili alla vendita e/o
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
