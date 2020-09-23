DROP TABLE IF EXISTS studios;

CREATE TABLE studios(
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  city TEXT, 
  state TEXT, 
  country TEXT
);
