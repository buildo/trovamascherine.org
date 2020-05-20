import * as React from "react";
import cx from "classnames";
import { useFormatMessage, FormattedMessage } from "../../intl";
import { Box } from "../Box/Box";
import { Text } from "../Text/Text";
import * as classes from "./Footer.treat";
import { Link } from "../Link/Link";
import { Title } from "../Text/Title";
import { Label } from "../Text/Label";
import { config } from "../../config";

interface IFooterProps {
  className?: string;
}
export function Footer(props: IFooterProps) {
  const formatMessage = useFormatMessage();
  return (
    <Box
      className={cx(classes.footer, props.className)}
      hAlignContent="center"
      width="100%"
    >
      <Box
        className={cx(classes.footerBox, classes.footerBoxNoPaddingMobile)}
        vAlignContent="center"
      >
        <Title size={4} className={cx(classes.footerText, classes.footerTitle)}>
          {formatMessage("App.name")}
        </Title>
      </Box>
      <Box className={classes.footerBox} vAlignContent="center">
        <Text size={4} className={classes.footerText}>
          {formatMessage("Footer.inCollaboration")}
        </Text>
      </Box>
      <Box className={classes.footerBox} vAlignContent="center">
        <Text size={4} className={classes.footerText}>
          {formatMessage("Footer.contactUs")}
          <br />
          <Link
            href={`mailto:${formatMessage("Footer.emailSupport")}`}
            className={classes.footerLink}
          >
            {formatMessage("Footer.emailSupport")}
          </Link>
          <br />
          <br />
          <Text size={4} className={classes.footerText}>
            {formatMessage("Footer.contactUsForAds")}
            <br />
            <Link
              href={`mailto:${formatMessage("Footer.emailAds")}`}
              className={classes.footerLink}
            >
              {formatMessage("Footer.emailAds")}
            </Link>
          </Text>
        </Text>
      </Box>
      <Box
        column
        className={cx(classes.footerBox, classes.linksBox)}
        vAlignContent="center"
      >
        <Text size={4} className={classes.footerText}>
          <Link
            target="_blank"
            href="/cookie-policy.pdf"
            className={classes.footerLink}
          >
            {formatMessage("Footer.cookiePolicy")}
          </Link>
        </Text>
        <Text size={4} className={classes.footerText}>
          <Link
            target="_blank"
            href="/terms-and-conditions.pdf"
            className={classes.footerLink}
          >
            {formatMessage("Footer.termsAndConditions")}
          </Link>
        </Text>
        <Text size={4} className={classes.footerText}>
          <Link
            target="_blank"
            href="/privacy-policy.pdf"
            className={classes.footerLink}
          >
            {formatMessage("Footer.privacyPolicy")}
          </Link>
        </Text>
      </Box>
      <Box
        column
        className={cx(classes.footerBox, classes.linksBox)}
        vAlignContent="center"
      >
        <Text size={4} className={classes.footerText}>
          <Link href="/credits" className={classes.footerLink}>
            {formatMessage("Footer.credits")}
          </Link>
        </Text>
        <Label size={2} className={classes.footerText}>
          <FormattedMessage
            id="Footer.appVersion"
            values={{ version: config.appVersion }}
          />
        </Label>
      </Box>
    </Box>
  );
}
