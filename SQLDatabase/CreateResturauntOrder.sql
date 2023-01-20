CREATE TABLE ResturauntOrder (
	order_id VARCHAR(255) NOT NULL,
	item_id VARCHAR(255) NOT NULL,
	PRIMARY KEY (order_id),
	FOREIGN KEY (item_id) REFERENCES Menu(item_id)
);