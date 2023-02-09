CREATE TABLE Menu (
  item_id SERIAL NOT NULL,
  item_name VARCHAR(255),
  calories int,
  category VARCHAR(255),
  description VARCHAR(255),
  price DECIMAL(12, 2),
  currently_avaliable BOOLEAN,
  est_wait_time int,
  PRIMARY KEY (item_id)
);