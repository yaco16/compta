CREATE TABLE users (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name text,
  email text,
  password text
);

CREATE TABLE accounts (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  number int,
  label text,
  debit text,
  credit int,
  total int
);