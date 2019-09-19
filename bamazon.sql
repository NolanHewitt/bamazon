DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INTEGER(20) NOT NULL,
  stock_quantity INTEGER(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("brick", "outside", 5, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("waffle", "inside", 7, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mario hat", "clothes", 20, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("candy cane", "candy", 3, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "electronics", 400, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("computer", "electronics", 1000, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("car", "autos", 10000, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "clothes", 30, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chips", "food", 3, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("soda", "drinks", 2, 2000);