CREATE TABLE Menu (
  item_id VARCHAR(255) NOT NULL,
  item_name VARCHAR(255),
  allergies VARCHAR(255),
  calories int,
  currently_avaliable BOOLEAN,
  est_wait_time int,
  PRIMARY KEY (item_id)
);