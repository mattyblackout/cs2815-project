CREATE TABLE Menu (
  id SERIAL NOT NULL,
  item_name VARCHAR(255),
  calories int,
  diet VARCHAR(255),
  category VARCHAR(255),
  description VARCHAR(255),
  price DECIMAL(12, 2),
  avaliable BOOLEAN,
  PRIMARY KEY (item_id),
);