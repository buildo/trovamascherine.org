CREATE OR REPLACE FUNCTION createschemas() RETURNS void AS $$
DECLARE
schemas varchar[] := ARRAY[
  'trovamascherine'
];
schema varchar;

BEGIN
  FOREACH schema IN ARRAY schemas LOOP

    RAISE INFO 'Setting up schema %', schema;
    EXECUTE 'CREATE SCHEMA IF NOT EXISTS ' || schema;
    EXECUTE 'GRANT ' || schema || ' TO current_user';
    EXECUTE 'ALTER SCHEMA ' || schema || ' OWNER TO ' || schema;
    EXECUTE 'GRANT SELECT ON ALL TABLES IN SCHEMA ' || schema || ' TO leggo';
    EXECUTE 'GRANT SELECT ON ALL SEQUENCES IN SCHEMA ' || schema || ' TO leggo';
    RAISE INFO 'Completed setting up schema %', schema;

  END LOOP;
END;

$$ LANGUAGE plpgsql;


SELECT createschemas();

