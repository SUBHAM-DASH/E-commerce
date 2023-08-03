const { executeQuery, executeQueryWithParams } = require("../db");
const { v4: uuidv4, v5: uuidv5, validate: uuidValidate } = require("uuid");
const {
  createAddProductTableQuery,
  insertIntoProductTableQuery,
  isExistProductTableQuery,
} = require("../sql/product.query");

//************************ Add Seller Product ******************//
exports.addSellerProduct = async (req, res) => {
  try {
    const {
      productName,
      productTitle,
      productPrice,
      productDesc,
      productColor,
      productSize,
    } = req.body;
    const images =
      req.files && req.files?.image.length > 0
        ? req.files?.image?.map((a) => a.filename)
        : [];
    const sellerId = req.user;
    const _id = uuidv4();

    const [isExistProductTable] = await executeQuery(isExistProductTableQuery);
    if (!isExistProductTable) {
      await executeQuery(createAddProductTableQuery);
    }
    const data = [
      _id,
      productName,
      productTitle,
      productDesc,
      productPrice,
      productSize,
      productColor,
      JSON.stringify([]),
      JSON.stringify(images),
      sellerId,
    ];
    executeQueryWithParams(insertIntoProductTableQuery, data)
      .then((response) => {
        return res.status(201).json({
          status: "success",
          message: "product Added.",
          data: {
            _id,
            productName,
            productTitle,
            productDesc,
            productPrice,
            productSize,
            productColor,
            likes: JSON.stringify(likes),
            images: JSON.stringify(images),
            sellerId,
          },
        });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ status: "failed", message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};


