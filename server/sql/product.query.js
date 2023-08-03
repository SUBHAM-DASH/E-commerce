const createAddProductTableQuery = `
  CREATE TABLE products (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    images JSON,
    producttitle VARCHAR(255),
    productname VARCHAR(255),
    price DECIMAL(10, 2),
    size JSON,
    description TEXT,
    color JSON,
    likes JSON,
    sellerId varchar(50),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sellerId) REFERENCES user (_id)
  )
`;

const isExistProductTableQuery = `SHOW TABLES LIKE 'products'`;

const insertIntoProductTableQuery = `
    INSERT INTO products(
      _id,
      productname,
      producttitle,
      description,
      price,
      size,
      color,
      likes,
      images,
      sellerId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

module.exports = {
  createAddProductTableQuery,
  isExistProductTableQuery,
  insertIntoProductTableQuery,
};
