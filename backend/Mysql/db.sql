CREATE DATABASE IF NOT EXISTS qrcode;

USE qrcode;

CREATE TABLE IF NOT EXISTS users (
   id INT AUTO_INCREMENT PRIMARY KEY,
    ad_id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    product_name VARCHAR(255),
    brand_name VARCHAR(255),
    description TEXT,
    hashed_data TEXT
);
