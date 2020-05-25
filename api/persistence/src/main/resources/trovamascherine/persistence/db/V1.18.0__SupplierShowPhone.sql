ALTER TABLE supplier
ADD COLUMN show_phone BOOLEAN not null
DEFAULT true;

ALTER TABLE supplier
ALTER COLUMN show_phone
DROP DEFAULT;
