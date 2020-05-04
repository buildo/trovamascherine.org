import * as React from "react";
import { Modal } from "../Modal/Modal";
import { some } from "fp-ts/lib/Option";
import { Title } from "../Text/Title";
import { FormattedMessage, useFormatMessage } from "../../intl";
import { Text } from "../Text/Text";
import { Space } from "../Space/Space";
import { SupportEmailLink } from "../SupportEmailLink/SupportEmailLink";
import { Box } from "../Box/Box";
import { PharmaIcon } from "../Icons/PharmaIcon";

type Props = {
  onDismiss: () => unknown;
};

export function PharmacistCTAModal(props: Props) {
  const formatMessage = useFormatMessage();
  return (
    <Modal onDismiss={some(props.onDismiss)}>
      <Box column width="100%">
        <Title size={3}>
          <FormattedMessage id="PharmacistModal.title" />
        </Title>
        <Space units={3} />
        <Text size={1}>
          <FormattedMessage id="PharmacistModal.content1" />
        </Text>
        <Space units={6} />
        <Box width="100%" hAlignContent="center">
          <PharmaIcon width={124} height={124} />
        </Box>
        <Space units={6} />
        <Text size={1}>
          <FormattedMessage id="PharmacistModal.content2" />
          <SupportEmailLink
            subject={formatMessage("PharmacistModal.emailSubject")}
            body={formatMessage("PharmacistModal.emailBody")}
          />
          <FormattedMessage id="PharmacistModal.content3" />
        </Text>
      </Box>
    </Modal>
  );
}
