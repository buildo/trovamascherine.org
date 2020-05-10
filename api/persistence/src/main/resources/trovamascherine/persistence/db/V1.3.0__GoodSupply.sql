CREATE TABLE good_supply (
  supplier_id uuid NOT NULL,
  good varchar(255) NOT NULL,
  quantity int NOT NULL,
  lastUpdatedOn timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
