import React, { useState } from "react";
import { Title } from "../Text/Title";
import { useFormatMessage, FormattedMessage } from "../../intl";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { Box } from "../Box/Box";
import * as classes from "./SupplierSettings.treat";
import { Text } from "../Text/Text";
import { Space } from "../Space/Space";
import { Children } from "../../util";
import { Button } from "../Button/Button";
import { option, either } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";
import { constant, identity, flow } from "fp-ts/lib/function";
import { TextField } from "../Field/TextField";
import { TaskEither } from "fp-ts/lib/TaskEither";
import { Option } from "fp-ts/lib/Option";
import { ToggleButtonGroup } from "../Button/ToggleButtonGroup";
import * as Z from "fp-ts-contrib/lib/Zipper";
import { Label } from "../Text/Label";
import { BackLink } from "../Link/BackLink";
import { ReaderTaskEither } from "fp-ts/lib/ReaderTaskEither";
import { Supplier } from "../../domain";

type SupplierDataState = {
  phoneNumber: Option<NonEmptyString>;
};
type SupplierConfigState = {
  showPhoneNumber: boolean;
};

type Props = {
  supplierConfig: Supplier["config"];
  supplierData: Supplier["data"];
  onSaveSupplierData: ReaderTaskEither<SupplierDataState, unknown, unknown>;
  onSaveSupplierConfig: ReaderTaskEither<SupplierConfigState, unknown, unknown>;
};

function Setting<T>(props: {
  title: string;
  expandedContent: () => Children;
  value: T;
  valueFormatter: (value: T) => string;
  onSave: TaskEither<unknown, unknown>;
}) {
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const formatMessage = useFormatMessage();

  const editCancelButtonLabel = expanded
    ? formatMessage("SupplierSettings.cancel")
    : formatMessage("SupplierSettings.edit");

  return (
    <Box column>
      <Box vAlignContent="center">
        <Title size={6}>{props.title}</Title>
        <Space grow />
        <Button
          variant="flat"
          size="medium"
          icon={option.none}
          label={editCancelButtonLabel}
          action={() => {
            setExpanded(!expanded);
          }}
        />
      </Box>
      {expanded ? (
        <>
          {props.expandedContent()}
          <Space units={10} />
          <Box>
            <Button
              variant="primary"
              size="medium"
              icon={option.none}
              label={formatMessage(
                saving ? "SupplierSettings.saving" : "SupplierSettings.save"
              )}
              action={() => {
                setSaving(true);
                props.onSave().then(res => {
                  setSaving(false);
                  pipe(
                    res,
                    either.fold(
                      () => {},
                      () => {
                        setExpanded(false);
                      }
                    )
                  );
                });
              }}
            />
          </Box>
        </>
      ) : (
        <Box>{props.valueFormatter(props.value)}</Box>
      )}
    </Box>
  );
}

export function SupplierSettings(props: Props) {
  const formatMessage = useFormatMessage();
  const [currentSupplierData, setCurrentSupplierData] = useState<
    SupplierDataState
  >({
    phoneNumber: props.supplierData.phoneNumber,
  });
  const [currentSupplierConfig, setCurrentSupplierConfig] = useState<
    SupplierConfigState
  >({
    showPhoneNumber: props.supplierConfig.showPhoneNumber,
  });

  const onSavePhone = props.onSaveSupplierData(currentSupplierData);
  const onSaveShowPhone = props.onSaveSupplierConfig(currentSupplierConfig);

  const publicNumber = {
    label: formatMessage("SupplierSettings.phoneVisibilityPublic"),
    description: formatMessage(
      "SupplierSettings.phoneVisibilityPublicDescription"
    ),
  };
  const privateNumber = {
    label: formatMessage("SupplierSettings.phoneVisibilityPrivate"),
    description: formatMessage(
      "SupplierSettings.phoneVisibilityPrivateDescription"
    ),
  };

  return (
    <Box column className={classes.settings}>
      <BackLink />
      <Space units={6} />
      <Title size={5}>
        {formatMessage("SupplierSettings.serviceSettings")}
      </Title>
      <Text size={1}>
        {formatMessage("SupplierSettings.serviceSettingsDescription")}
      </Text>
      <Space units={6} />
      <Setting
        title={formatMessage("SupplierSettings.phoneNumber")}
        value={currentSupplierData.phoneNumber}
        valueFormatter={option.fold(() => "-", identity)}
        onSave={onSavePhone}
        expandedContent={() => (
          <TextField
            type="tel"
            label={formatMessage("SupplierSettings.phoneNumberLabel")}
            labelSize={2}
            value={pipe(
              currentSupplierData.phoneNumber,
              option.getOrElse(constant(""))
            )}
            onChange={flow(
              NonEmptyString.decode,
              either.fold(() => option.none, option.some),
              phoneNumber =>
                setCurrentSupplierData({
                  ...currentSupplierData,
                  phoneNumber,
                })
            )}
            error={option.none}
            clearable={option.some("")}
            placeholder=""
          />
        )}
      />
      <hr />
      <Setting
        title={formatMessage("SupplierSettings.phoneVisibility")}
        value={currentSupplierConfig.showPhoneNumber}
        valueFormatter={val =>
          val
            ? `${formatMessage(
                "SupplierSettings.phoneVisibilityPublic"
              )} - ${formatMessage(
                "SupplierSettings.phoneVisibilityPublicDescription"
              )}`
            : `${formatMessage(
                "SupplierSettings.phoneVisibilityPrivate"
              )} - ${formatMessage(
                "SupplierSettings.phoneVisibilityPrivateDescription"
              )}`
        }
        onSave={onSaveShowPhone}
        expandedContent={() => (
          <Box column>
            <Label size={2}>
              <FormattedMessage id="SupplierSettings.phoneVisibilityLabel" />
            </Label>
            <Space units={4} />
            <ToggleButtonGroup
              options={
                currentSupplierConfig.showPhoneNumber
                  ? Z.make([], publicNumber, [privateNumber])
                  : Z.make([publicNumber], privateNumber, [])
              }
              onChange={z => {
                setCurrentSupplierConfig({
                  ...currentSupplierConfig,
                  showPhoneNumber: z.rights.length > 0,
                });
              }}
            />
          </Box>
        )}
      />
    </Box>
  );
}
