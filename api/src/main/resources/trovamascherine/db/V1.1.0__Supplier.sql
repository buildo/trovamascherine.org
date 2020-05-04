CREATE TABLE supplier (
  id uuid PRIMARY KEY,
  email varchar(255) NOT NULL,
  cap varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  latitude float NOT NULL,
  longitude float NOT NULL,
  name varchar(255),
  comune varchar(255),
  regione varchar(255),
  referencePhone varchar(255)
);
