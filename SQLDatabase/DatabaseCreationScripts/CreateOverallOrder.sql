CREATE TABLE OverallOrder (
	order_id SERIAL NOT NULL,
	time_placed TIMESTAMP,
	time_finished TIMESTAMP,
	PRIMARY KEY (order_id),
	FOREIGN KEY (order_id) REFERENCES RestaurantOrder(order_id)
);