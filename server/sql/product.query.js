const createAddProductTableQuery = `
  CREATE TABLE products (
    _id VARCHAR(50) PRIMARY KEY,
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

const makingPaginationQuery = `
  SELECT * FROM products ORDER BY date LIMIT ? OFFSET ?;
`;

const isExistProductQuery = `SELECT * FROM products WHERE _id = ? AND sellerId = ?`;

const updateProductQuery = `
  UPDATE products
  SET productname = ?,
  producttitle = ?,
  description = ?,
  price = ?,
  size = ?,
  color = ?,
  likes = ?,
  images = ?
  WHERE _id = ? AND sellerId = ?
`;

module.exports = {
  createAddProductTableQuery,
  isExistProductTableQuery,
  insertIntoProductTableQuery,
  makingPaginationQuery,
  isExistProductQuery,
  updateProductQuery
};
