import * as React from "react";
import { Box } from "../Box/Box";
import { Space } from "../Space/Space";
import GoodStatusDetail from "./GoodStatusDetail";
import { useIsMobile } from "../../useMatchMedia";
import { either } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";
import { identity } from "fp-ts/lib/function";
import { Text } from "../Text/Text";
import { FormattedMessage } from "../../intl";
import { Title } from "../Text/Title";

type Props = {
  mascherina: either.Either<
    number,
    { ffp: number; chirurgica: number; lavabile: number }
  >;
  gel: number;
  glove: number;
  termoScanner: number;
};

export function GoodStatusDetails(props: Props) {
  const isMobile = useIsMobile();
  const vSpace = isMobile ? <Space units={4} /> : <Space units={8} />;
  const hSpace = isMobile ? <Space units={2} /> : <Space units={12} />;
  const width = isMobile ? "100%" : "500px";
  const titleSize = isMobile ? 5 : 4;
  const textSize = isMobile ? 4 : 2;
  const totalMasks = pipe(
    props.mascherina,
    either.fold(
      identity,
      ({ ffp, chirurgica, lavabile }) => ffp + chirurgica + lavabile
    )
  );

  return (
    <Box column width={width}>
      <Box width="100%" hAlignContent="center">
        <GoodStatusDetail good="Mascherina" quantity={totalMasks} />
        {hSpace}
        {pipe(
          props.mascherina,
          either.fold(
            () => (
              <Box grow shrink basis="100%" vAlignContent="center">
                <Text size={textSize}>
                  <FormattedMessage id="GoodStatusDetails.missingMaskDetails" />
                </Text>
              </Box>
            ),
            ({ ffp, chirurgica, lavabile }) => (
              <Box column grow vAlignContent="center">
                <Box height="30%" width="100%" vAlignContent="center">
                  <Text size={textSize}>
                    <FormattedMessage id="GoodStatusDetails.chirurgicaLabel" />
                  </Text>
                  <Space grow />
                  <Title size={titleSize}>{String(chirurgica)}</Title>
                </Box>
                <Box height="30%" width="100%" vAlignContent="center">
                  <Text size={textSize}>
                    <FormattedMessage id="GoodStatusDetails.ffpLabel" />
                  </Text>
                  <Space grow />
                  <Title size={titleSize}>{String(ffp)}</Title>
                </Box>
                <Box height="30%" width="100%" vAlignContent="center">
                  <Text size={textSize}>
                    <FormattedMessage id="GoodStatusDetails.lavabiliLabel" />
                  </Text>
                  <Space grow />
                  <Title size={titleSize}>{String(lavabile)}</Title>
                </Box>
              </Box>
            )
          )
        )}
        {hSpace}
      </Box>
      {vSpace}
      <Box width="100%" hAlignContent="center">
        <GoodStatusDetail good="Guanti" quantity={props.glove} />
        <GoodStatusDetail good="Termoscanner" quantity={props.termoScanner} />
        <GoodStatusDetail good="Gel" quantity={props.gel} />
      </Box>
    </Box>
  );
}
