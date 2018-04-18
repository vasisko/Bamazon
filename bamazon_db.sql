DROP DATABASE if exists bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50),
department_name VARCHAR(50),
price DECIMAL(10,2),
stock_quantity INTEGER(10),
PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES
("Lavender Oil", "Beauty and Personal Care", 12.99, 12),
("Jump Rope", "Sports and Outdoors", 10.99, 24),
("Frisbee", "Sports and Outdoors", 12.99, 12),
("Soy Candles", "Home Decor", 15.99, 48),
("Headphones", "Electronics", 24.99, 30),
("Car Diffuser", "Automotive", 27.99, 24),
("Honey Dispenser", "Kitchen", 29.99, 24),
("Clarity Essential Oil Blend", "Beauty and Personal Care", 14.99, 12),
("Kazoo", "Music", 11.99,48),
("Birdhouse", "Garden", 34.99, 10)
;
