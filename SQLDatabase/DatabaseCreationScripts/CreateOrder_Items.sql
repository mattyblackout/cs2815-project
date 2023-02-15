CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_number INT REFERENCES orders(order_number),
    item_id INT REFERENCES menu(id),
    item_quantity INT
);
