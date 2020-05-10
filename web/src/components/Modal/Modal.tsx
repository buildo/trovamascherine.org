import * as React from "react";
import * as classes from "./Modal.treat";
import cx from "classnames";
import { ModalPortal } from "./ModalPortal";
import * as O from "fp-ts/lib/Option";
import { Option } from "fp-ts/lib/Option";
import { CommonProps, Children } from "../../util";
import { Box } from "../Box/Box";
import { pipe } from "fp-ts/lib/pipeable";
import { CloseIcon } from "../Icons/CloseIcon";
import { Space } from "../Space/Space";
import { Title } from "../Text/Title";

type Props = CommonProps & {
  /**
   * Action to invoke when the `Modal` is dismissed.
   * Providing `none` means the `Modal` is not dismissable
   */
  onDismiss: Option<() => unknown>;
  /** Modal title */
  title: string;
  /** Modal content */
  children: Children;
};

export function Modal(props: Props) {
  const dismissIcon = pipe(
    props.onDismiss,
    O.map(onDismiss => (
      <Box
        vAlignContent="center"
        className={classes.dismissIcon}
        onClick={onDismiss}
      >
        <CloseIcon width={24} height={24} />
      </Box>
    )),
    O.toNullable
  );

  return (
    <ModalPortal>
      <div className={classes.overlay}>
        <Box
          vAlignContent="center"
          hAlignContent="center"
          className={classes.modalContainer}
          onClick={pipe(props.onDismiss, O.toUndefined)}
        >
          <Box
            width={props.width || "656px"}
            column
            id={props.id}
            className={cx(classes.modal, props.className)}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <Box width="100%" vAlignContent="top" className={classes.header}>
              <Title size={4}>{props.title}</Title>
              <Space grow />
              <Space units={2} />
              {dismissIcon}
            </Box>
            <Box grow shrink className={classes.content}>
              {props.children}
            </Box>
            <Box width="100%" className={classes.footer} />
          </Box>
        </Box>
      </div>
    </ModalPortal>
  );
}
