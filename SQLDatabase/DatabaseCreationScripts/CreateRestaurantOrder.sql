CREATE TABLE RestaurantOrder (
	order_id SERIAL NOT NULL,
	item_id SERIAL NOT NULL,
	quantity int,
	PRIMARY KEY (order_id),
	FOREIGN KEY (item_id) REFERENCES Menu(id)
);