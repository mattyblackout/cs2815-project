CREATE TABLE orders (
    order_number SERIAL PRIMARY KEY,
    time_ordered TIME,
    confirmed BOOLEAN,
    complete BOOLEAN
);
