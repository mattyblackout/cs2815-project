CREATE TABLE orders (
    order_number SERIAL,
    time_ordered TIME,
    confirmed BOOLEAN,
	complete BOOLEAN,
	table_no int,
	PRIMARY KEY (order_number),
	FOREIGN KEY (table_no) REFERENCES Tables(table_no)
);
