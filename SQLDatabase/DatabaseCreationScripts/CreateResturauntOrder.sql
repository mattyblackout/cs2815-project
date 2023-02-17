CREATE TABLE ResturauntOrder (
	order_id SERIAL NOT NULL,
	item_id SERIAL NOT NULL,
	quantity int,
	PRIMARY KEY (order_id, item_id),
	FOREIGN KEY (item_id) REFERENCES Menu(item_id)
);