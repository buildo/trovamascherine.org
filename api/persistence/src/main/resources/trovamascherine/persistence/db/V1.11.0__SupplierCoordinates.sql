ALTER TABLE supplier 
ADD COLUMN coordinates geometry(POINT,4326);

UPDATE supplier
SET coordinates = ST_SetSRID(ST_MakePoint(subquery.longitude, subquery.latitude), 4326)
FROM (SELECT latitude, longitude, id
      FROM supplier) AS subquery
WHERE supplier.id=subquery.id;

ALTER TABLE supplier
ALTER column coordinates SET NOT NULL;

ALTER TABLE supplier
DROP column latitude;

ALTER TABLE supplier
DROP column longitude;