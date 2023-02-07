CREATE TABLE ItemContains (
	item_id SERIAL NOT NULL,
	ingredient VARCAHR(255),
	PRIMARY KEY (item_id),
	FOREIGN KEY (item_id) REFERENCES Menu(item_id)
);