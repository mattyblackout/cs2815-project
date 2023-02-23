CREATE TABLE Customer (
	table_no int NOT NULL,
	Name VARCHAR(255),
	order_id SERIAL,
	PRIMARY KEY (table_no),
	FOREIGN KEY (table_no) REFERENCES Tables(table_no),
	FOREIGN KEY (order_id) REFERENCES RestaurantOrder(order_id)
);