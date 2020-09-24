DROP TABLE IF EXISTS studios;
DROP TABLE IF EXISTS actors;

CREATE TABLE studios(
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  city TEXT, 
  state TEXT, 
  country TEXT
);

CREATE TABLE actors(
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  date_of_birth DATE,
  place_of_birth TEXT
);
