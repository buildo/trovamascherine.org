CREATE TABLE supplier_token ( 
  supplier_id uuid NOT NULL,
  token varchar(255) NOT NULL,
  FOREIGN KEY (supplier_id) REFERENCES supplier (id)
);

