import * as React from "react";
import { Modal } from "../Modal/Modal";
import { Box } from "../Box/Box";
import * as O from "fp-ts/lib/Option";
import { text } from "./WelcomeModal.treat";
import { Text } from "../Text/Text";
import { Label } from "../Text/Label";
import { Link } from "../Link/Link";
import { Space } from "../Space/Space";
import { Button } from "../Button/Button";
import { useFormatMessage } from "../../intl";
import { pipe } from "fp-ts/lib/pipeable";

export function WelcomeModal() {
  const formatMessage = useFormatMessage();
  const browserAccepted = pipe(
    O.tryCatch(() => localStorage.getItem("WelcomeModal")),
    O.map(a => a === "x"),
    O.getOrElse(() => false)
  );
  const [accepted, setAccepted] = React.useState(browserAccepted);

  const onDismiss = () => {
    setAccepted(true);
    localStorage.setItem("WelcomeModal", "x");
  };

  return accepted ? null : (
    <Modal
      title="Benvenuta/o in trovamascherine.org!"
      onDismiss={O.some(onDismiss)}
      footer={O.none}
    >
      <Box width="100%" column>
        <Text size={2} className={text}>
          <b>TrovaMascherine</b> ti permette di sapere quanti{" "}
          <b>Dispositivi di Protezione Individuale</b> (DPI) - mascherine, gel
          disinfettanti, guanti monouso e termoscanner - sono{" "}
          <b>disponibili nelle farmacie vicine a te</b>.
        </Text>
        <Space units={8} />
        <Text size={2} className={text}>
          TrovaMascherine è facile da usare, <b>gratuito e sicuro</b>, e non
          utilizza i tuoi dati personali.
        </Text>
        <Space units={8} />
        <Text size={2} className={text}>
          Ricorda: usare i DPI è importante per <b>proteggere te stesso</b> e
          gli altri.
        </Text>
        <Space units={8} />
        <Label size={2} className={text}>
          Cliccando su “Trova Dispositivi di Protezione Individuale” o
          proseguendo nella navigazione dichiari di aver letto e aver preso
          visione dei{" "}
          <Link target="_blank" href="/terms-and-conditions.pdf">
            termini e condizioni
          </Link>{" "}
          del servizio e della{" "}
          <Link target="_blank" href="/privacy-policy.pdf">
            privacy policy
          </Link>{" "}
          e di accettarne il contenuto.
        </Label>
        <Space units={6} />
        <Box width="100%" hAlignContent="center">
          <Button
            variant="primary"
            size="medium"
            action={onDismiss}
            label={formatMessage("WelcomeModal.dismissLabel")}
            icon={O.none}
          />
        </Box>
        <Space units={2} />
      </Box>
    </Modal>
  );
}
