CREATE DATABASE IF NOT EXISTS project_trybeer;

USE project_trybeer;

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY `email_un` (email)
);

CREATE TABLE sales (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(4,2) NOT NULL,
    url_image VARCHAR(200) NOT NULL DEFAULT '',
    PRIMARY KEY(id),
    UNIQUE KEY `name` (name)
);

CREATE TABLE sales_products (
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity VARCHAR(10) NOT NULL,
    PRIMARY KEY(sale_id, product_id),
    FOREIGN KEY(sale_id) REFERENCES sales(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
);

INSERT INTO users (id, name, email, password, role) VALUES 
    ('1', 'tryber', 'tryber@trybe.com.br', '123456', 'administrator');

INSERT INTO products(id, name, price) VALUES
('1','Skol Lata 250ml',2.20),
('2','Heineken 600ml',7.50),
('3','Antarctica Pilsen 300ml',2.49),
('4','Brahma 600ml',7.50),
('5','Skol 269ml',2.19),
('6','Skol Beats Senses 313ml',4.49),
('7','Becks 330ml',4.99),
('8','Brahma Duplo Malte 350ml',2.79),
('9','Becks 600ml',8.89),
('10','Skol Beats Senses 269ml',3.57),
('11','Stella Artois 275ml',3.49);


