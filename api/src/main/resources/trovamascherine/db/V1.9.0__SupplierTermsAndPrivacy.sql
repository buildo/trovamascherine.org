ALTER TABLE supplier
ADD COLUMN terms_accepted_on timestamptz;

ALTER TABLE supplier
ADD COLUMN privacy_policy_accepted_on timestamptz;
