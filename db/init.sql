DROP DATABASE IF EXISTS CatShopDB;
CREATE DATABASE CatShopDB;
USE CatShopDB;

CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    category ENUM('Cuido', 'Arena', 'Juguete', 'Accesorio') NOT NULL
);

INSERT INTO Products (name, price, description, category) VALUES
('Cuido Gato Adulto', 45.50, 'Cuido premium para gatos adultos, 2kg', 'Cuido'),
('Arena Sanitaria', 20.00, 'Arena absorbente con control de olores', 'Arena'),
('Ratón de Juguete', 8.99, 'Juguete suave con sonido para gatos', 'Juguete'),
('Rascador Mediano', 35.00, 'Rascador de cartón reciclado', 'Accesorio');

