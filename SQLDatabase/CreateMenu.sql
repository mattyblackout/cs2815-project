CREATE TABLE Menu (
  item_id VARCHAR(255) NOT NULL,
  allergies VARCHAR(255),
  calories int,
  currently_avaliable BOOLEAN,
  est_wait_time int,
  PRIMARY KEY (item_id)
);