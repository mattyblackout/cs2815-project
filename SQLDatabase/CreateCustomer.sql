CREATE TABLE Customer (
	table_no int NOT NULL,
	Name VARCHAR(255),
	order_id VARCHAR(255),
	PRIMARY KEY (table_no),
	FOREIGN KEY (table_no) REFERENCES Tables(table_no),
	FOREIGN KEY (order_id) REFERENCES ResturauntOrder(order_id)
);