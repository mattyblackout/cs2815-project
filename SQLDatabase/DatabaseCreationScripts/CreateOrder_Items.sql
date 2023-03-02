CREATE TABLE order_items (
    order_number INT,
    item_id INT,
    item_quantity INT,
    PRIMARY KEY (order_number, item_id),
    FOREIGN KEY (order_number) REFERENCES orders(order_number),
    FOREIGN KEY item_id REFERENCES menu(id)
);
