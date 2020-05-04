import * as React from "react";
import { Box } from "../Box/Box";
import * as classes from "./UpdateViewForm.treat";
import { TextField } from "../Field/TextField";
import { Title } from "../Text/Title";
import { useFormatMessage } from "../../intl";
import * as O from "fp-ts/lib/Option";
import { Space } from "../Space/Space";
import { Button } from "../Button/Button";
import * as t from "io-ts";
import { IntFromString } from "io-ts-types/lib/IntFromString";
import { pipe } from "fp-ts/lib/pipeable";
import * as E from "fp-ts/lib/Either";
import * as R from "fp-ts/lib/ReadonlyRecord";
import { intercalateChildren, Children } from "../../util";
import { Label } from "../Text/Label";
import { sequenceS } from "fp-ts/lib/Apply";
import { getStructSemigroup, Semigroup } from "fp-ts/lib/Semigroup";
import { Link } from "../Link/Link";
import { legal } from "./UpdateView.treat";
import { identity } from "fp-ts/lib/function";
import { CheckboxField } from "../Field/CheckboxField";

type Props = {
  previousValues: Values;
  onSubmit: (values: Values) => unknown;
  requireAcceptance: boolean;
};

type FormState = {
  mascherine: string;
  gel: string;
  guanti: string;
  scanner: string;
  acceptance: boolean;
};

interface PositiveBrand {
  readonly Positive: unique symbol;
}

const PositiveFromString = t.brand(
  IntFromString,
  (n): n is t.Branded<t.TypeOf<typeof IntFromString>, PositiveBrand> =>
    !isNaN(n) && n >= 0,
  "Positive"
);

export const Values = t.type(
  {
    mascherine: t.number,
    gel: t.number,
    guanti: t.number,
    scanner: t.number,
  },
  "Values"
);

export type Values = t.TypeOf<typeof Values>;

type Errors = Record<keyof FormState, O.Option<string>>;

function error<K extends keyof Errors>(k: K, message: string): Errors {
  return {
    mascherine: O.none,
    gel: O.none,
    guanti: O.none,
    scanner: O.none,
    acceptance: O.none,
    [k]: O.some(message),
  };
}

const errorSemigroup: Semigroup<O.Option<string>> = {
  concat: (a, b) =>
    pipe(
      b,
      O.alt(() => a)
    ),
};
const errorsSemigroup: Semigroup<Errors> = getStructSemigroup({
  mascherine: errorSemigroup,
  gel: errorSemigroup,
  guanti: errorSemigroup,
  scanner: errorSemigroup,
  acceptance: errorSemigroup,
});

function validateForm(
  formState: FormState,
  errorMessages: { [K in keyof Errors]: string }
): E.Either<Errors, Values> {
  return pipe(
    sequenceS(E.getValidation(errorsSemigroup))({
      mascherine: pipe(
        PositiveFromString.decode(formState.mascherine),
        E.mapLeft(() => error("mascherine", errorMessages.mascherine))
      ),
      gel: pipe(
        PositiveFromString.decode(formState.gel),
        E.mapLeft(() => error("gel", errorMessages.gel))
      ),
      guanti: pipe(
        PositiveFromString.decode(formState.guanti),
        E.mapLeft(() => error("guanti", errorMessages.guanti))
      ),
      scanner: pipe(
        PositiveFromString.decode(formState.scanner),
        E.mapLeft(() => error("scanner", errorMessages.scanner))
      ),
      acceptance: pipe(
        formState.acceptance,
        E.fromPredicate(identity, () =>
          error("acceptance", errorMessages.acceptance)
        )
      ),
    }),
    E.map(({ mascherine, gel, guanti, scanner }) => ({
      mascherine,
      gel,
      guanti,
      scanner,
    }))
  );
}

export function UpdateViewForm(props: Props) {
  const formatMessage = useFormatMessage();
  const [formState, setFormState] = React.useState<FormState>({
    mascherine: String(props.previousValues.mascherine),
    gel: String(props.previousValues.gel),
    guanti: String(props.previousValues.guanti),
    scanner: String(props.previousValues.scanner),
    acceptance: !props.requireAcceptance,
  });
  const [
    submittedWithInlineErrors,
    setSubmittedWithInlineErrors,
  ] = React.useState<O.Option<Errors>>(O.none);
  const onChange = <K extends keyof FormState>(field: K) => (
    value: FormState[K]
  ) => {
    setFormState(s => ({ ...s, [field]: value }));
  };
  const changed = {
    mascherine:
      formState.mascherine === String(props.previousValues.mascherine),
    gel: formState.gel === String(props.previousValues.gel),
    guanti: formState.guanti === String(props.previousValues.guanti),
    scanner: formState.scanner === String(props.previousValues.scanner),
  };
  function onSubmit() {
    const validated = validateForm(formState, {
      mascherine: formatMessage("UpdateViewForm.errorMascherine"),
      gel: formatMessage("UpdateViewForm.errorGel"),
      guanti: formatMessage("UpdateViewForm.errorGuanti"),
      scanner: formatMessage("UpdateViewForm.errorScanner"),
      acceptance: formatMessage("UpdateViewForm.errorAcceptance"),
    });
    if (E.isRight(validated)) {
      setSubmittedWithInlineErrors(O.none);
      props.onSubmit(validated.right);
    } else {
      setSubmittedWithInlineErrors(O.some(validated.left));
    }
  }
  const changedLabel = (
    <Label size={2}>{formatMessage("UpdateViewForm.invariato")}</Label>
  );
  const labels = pipe(
    {
      mascherine: ([
        formatMessage("UpdateViewForm.labelMascherine"),
      ] as Children[]).concat(changed.mascherine ? [changedLabel] : []),
      gel: ([formatMessage("UpdateViewForm.labelGel")] as Children[]).concat(
        changed.gel ? [changedLabel] : []
      ),
      guanti: ([
        formatMessage("UpdateViewForm.labelGuanti"),
      ] as Children[]).concat(changed.guanti ? [changedLabel] : []),
      scanner: ([
        formatMessage("UpdateViewForm.labelScanner"),
      ] as Children[]).concat(changed.scanner ? [changedLabel] : []),
    },
    R.map(labels => intercalateChildren(<>&nbsp;</>, labels))
  );

  return (
    <Box grow className={classes.form}>
      <form
        className={classes.formForm}
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          onSubmit();
        }}
      >
        <input type="submit" style={{ display: "none" }} />
        <Box column>
          <Title size={3}>{formatMessage("UpdateViewForm.header")}</Title>
          <Space units={3} />
          <TextField
            type="number"
            error={pipe(
              submittedWithInlineErrors,
              O.chain(e => e.mascherine)
            )}
            value={formState.mascherine}
            onChange={onChange("mascherine")}
            label={labels.mascherine}
            placeholder={formatMessage("UpdateViewForm.placeholderMascherine")}
            clearable={O.some("0")}
            width="100%"
          />
          <Space units={3} />
          <TextField
            type="number"
            error={pipe(
              submittedWithInlineErrors,
              O.chain(e => e.gel)
            )}
            value={formState.gel}
            onChange={onChange("gel")}
            label={labels.gel}
            placeholder={formatMessage("UpdateViewForm.placeholderGel")}
            clearable={O.some("0")}
            width="100%"
          />
          <Space units={3} />
          <TextField
            type="number"
            error={pipe(
              submittedWithInlineErrors,
              O.chain(e => e.guanti)
            )}
            value={formState.guanti}
            onChange={onChange("guanti")}
            label={labels.guanti}
            placeholder={formatMessage("UpdateViewForm.placeholderGuanti")}
            clearable={O.some("0")}
            width="100%"
          />
          <Space units={3} />
          <TextField
            type="number"
            error={pipe(
              submittedWithInlineErrors,
              O.chain(e => e.scanner)
            )}
            value={formState.scanner}
            onChange={onChange("scanner")}
            label={labels.scanner}
            placeholder={formatMessage("UpdateViewForm.placeholderScanner")}
            clearable={O.some("0")}
            width="100%"
          />
          <Space units={8} />
          {props.requireAcceptance ? (
            <CheckboxField
              value={formState.acceptance}
              onChange={onChange("acceptance")}
              label={
                <>
                  Accetto di aver letto e aver preso visione dei{" "}
                  <Link target="_blank" href="/terms-and-conditions.pdf">
                    termini e condizioni
                  </Link>{" "}
                  del servizio e della{" "}
                  <Link target="_blank" href="/privacy-policy.pdf">
                    privacy policy
                  </Link>{" "}
                  e di accettarne il contenuto.
                </>
              }
              error={pipe(
                submittedWithInlineErrors,
                O.chain(e => e.acceptance)
              )}
            />
          ) : (
            <Label size={2} className={legal}>
              Cliccando su “Conferma e aggiorna disponibilità” o proseguendo
              nella navigazione dichiari di aver letto e aver preso visione dei{" "}
              <Link target="_blank" href="/terms-and-conditions.pdf">
                termini e condizioni
              </Link>{" "}
              del servizio e della{" "}
              <Link target="_blank" href="/privacy-policy.pdf">
                privacy policy
              </Link>{" "}
              e di accettarne il contenuto.
            </Label>
          )}
          <Space units={4} />
          <Button
            variant="primary"
            size="medium"
            label={formatMessage("UpdateViewForm.buttonLabel")}
            action={onSubmit}
          />
        </Box>
      </form>
    </Box>
  );
}
