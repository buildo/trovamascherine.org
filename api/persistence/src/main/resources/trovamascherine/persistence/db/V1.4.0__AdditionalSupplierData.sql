ALTER TABLE supplier
ADD COLUMN external_id_code int NOT NULL,
ADD COLUMN vat_number varchar(255),
ADD COLUMN city_istat_code varchar(255),
ADD COLUMN province varchar(4);
