-- ---------------------------------------------------------------------------
-- Shajiya Sri Furniture Mart — MySQL schema reference
--
-- You normally do NOT need to run this file by hand: Flask-Migrate manages
-- the schema from the SQLAlchemy models in backend/app/models/. This file is
-- provided as a human-readable reference and for manual setup if preferred.
--
-- To create the database itself (once) before running migrations:
--   CREATE DATABASE shajiya_sri_furniture CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME
);

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(120) NOT NULL UNIQUE,
  icon VARCHAR(60),
  image_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  category_id INT NOT NULL,
  short_description VARCHAR(300) NOT NULL,
  description TEXT,
  materials VARCHAR(300),
  dimensions VARCHAR(150),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_new_arrival BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(500) NOT NULL,
  caption VARCHAR(200),
  category VARCHAR(100),
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(120) NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  message TEXT NOT NULL,
  is_sample BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(150),
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME
);
