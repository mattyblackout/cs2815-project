CREATE TABLE Menu (
  id SERIAL NOT NULL,
  name VARCHAR(255),
  ingredients VARCHAR(255),
  calories int,
  category VARCHAR(255),
  price DECIMAL(12, 2),
  description VARCHAR(255),
  avaliable BOOLEAN,
  est_wait_time int,
  PRIMARY KEY (id)
);