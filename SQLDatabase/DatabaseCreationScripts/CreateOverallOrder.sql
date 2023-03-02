CREATE TABLE OverallOrder (
	order_id SERIAL NOT NULL,
	time_placed TIMESTAMP,
	time_finished TIMESTAMP,
	table_no int,
	PRIMARY KEY (order_id),
	FOREIGN KEY (table_no) REFERENCES Tables(table_no)
);