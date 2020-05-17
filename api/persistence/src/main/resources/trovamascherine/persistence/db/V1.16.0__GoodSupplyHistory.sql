CREATE TABLE good_supply_history (
  supplier_id uuid NOT NULL,
  good varchar(255) NOT NULL,
  quantity int NOT NULL,
  updated_on timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
