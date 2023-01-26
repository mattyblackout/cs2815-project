CREATE TABLE ItemContains (
	item_id VARCHAR(255) NOT NULL,
	ingredient VARCAHR(255),
	PRIMARY KEY (item_id),
	FOREIGN KEY (item_id) REFERENCES Menu(item_id)
);