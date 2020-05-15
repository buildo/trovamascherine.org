import * as React from "react";
import { Modal } from "../Modal/Modal";
import { some, none } from "fp-ts/lib/Option";
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
    <Modal
      title={formatMessage("PharmacistModal.title")}
      onDismiss={some(props.onDismiss)}
      footer={none}
    >
      <Box column width="100%">
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
