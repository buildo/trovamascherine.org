
CREATE OR REPLACE FUNCTION update_lastupdatedon()
RETURNS TRIGGER AS $$
BEGIN
  NEW.lastupdatedon = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER lastupdatedon_trigger
BEFORE UPDATE ON trovamascherine.good_supply
FOR EACH ROW
EXECUTE PROCEDURE update_lastupdatedon();
