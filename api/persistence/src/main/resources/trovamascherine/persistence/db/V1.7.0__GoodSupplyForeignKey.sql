ALTER TABLE good_supply 
ADD CONSTRAINT supplier_id_foreign_key FOREIGN KEY (supplier_id) REFERENCES supplier (id);
