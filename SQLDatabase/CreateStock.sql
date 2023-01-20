CREATE TABLE Stock (
  item VARCHAR(255) NOT NULL,
  number int, --The amount of this item in stock
  PRIMARY KEY (item),
  FOREIGN KEY (item) references Menu(item_id)
);