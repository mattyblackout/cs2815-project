CREATE TABLE menu (
    id SERIAL,
    name varchar(255),
    ingredients varchar(255),
    calories int,
    category varchar(255),
    available boolean
    primary key (id)
    );