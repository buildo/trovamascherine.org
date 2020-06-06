import * as React from "react";
import { Box } from "../Box/Box";
import { Space } from "../Space/Space";
import GoodStatusDetail from "./GoodStatusDetail";
import GoodStatusDetailBox from "./GoodStatusDetailBox";
import { useIsMobile } from "../../useMatchMedia";
import { either } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";
import { identity } from "fp-ts/lib/function";
import { Text } from "../Text/Text";
import { FormattedMessage } from "../../intl";
import * as classes from "./GoodStatusDetails.treat";
import { Title } from "../Text/Title";

type Props = {
  mascherina: either.Either<
    number,
    { ffp: number; chirurgica: number; lavabile: number }
  >;
  gel: number;
  glove: number;
  termoScanner: number;
  alchool: number;
  pulsossimetro: number;
};

export function GoodStatusDetails(props: Props) {
  const isMobile = useIsMobile();
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
    <Box column width={width} className={classes.container}>
      <Box width="100%" hAlignContent="left" className={classes.mascherineBox}>
        <Box hAlignContent="left">
          <GoodStatusDetail good="Mascherina" quantity={totalMasks} />
        </Box>
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
      </Box>
      <Box column>
        <Box width="100%" hAlignContent="left">
          <GoodStatusDetailBox good="Gel" quantity={props.gel} />
          <GoodStatusDetailBox good="Alchool" quantity={props.alchool} />
        </Box>
        <Box width="100%" hAlignContent="left">
          <GoodStatusDetailBox good="Guanti" quantity={props.glove} />
          <GoodStatusDetailBox
            good="Termoscanner"
            quantity={props.termoScanner}
          />
        </Box>
        <Box width="100%" hAlignContent="left">
          <GoodStatusDetailBox
            good="Pulsossimetro"
            quantity={props.pulsossimetro}
          />
        </Box>
      </Box>
    </Box>
  );
}
