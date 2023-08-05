const { executeQuery, executeQueryWithParams } = require("../db");
const { v4: uuidv4, v5: uuidv5, validate: uuidValidate } = require("uuid");
const {
  createAddProductTableQuery,
  insertIntoProductTableQuery,
  isExistProductTableQuery,
  makingPaginationQuery,
  isExistProductQuery,
  updateProductQuery,
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
          message: "Product Added Successfully.",
          data: {
            _id,
            productName,
            productTitle,
            productDesc,
            productPrice,
            productSize,
            productColor,
            likes: JSON.stringify([]),
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

//*********************** Get Seller Product ******************//
exports.getSellerProduct = async (req, res) => {
  try {
    let { page, size } = req.query;
    page = parseInt(page);
    size = parseInt(size);

    const [isExistProductTable] = await executeQuery(isExistProductTableQuery);
    if (!isExistProductTable) {
      await executeQuery(createAddProductTableQuery);
    }

    const offset = (page - 1) * size;
    executeQueryWithParams(makingPaginationQuery, [size, offset])
      .then((response) => {
        res.status(200).json({ status: "success", data: response });
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

//********************** Edit Seller Product Details *****************//
exports.editSellerProduct = async (req, res) => {
  try {
    const {
      productName,
      productTitle,
      productPrice,
      productDesc,
      productColor,
      productSize,
      _id,
    } = req.body;
    const images =
      req.files && req.files?.image?.length > 0
        ? req.files?.image?.map((a) => a.filename)
        : [];

    let imagesfile = JSON.parse(req.body.imagesfiles);
    const sellerId = req.user;

    const [product] = await executeQueryWithParams(isExistProductQuery, [
      _id,
      sellerId,
    ]);

    imagesfile.concat(images.length > 0 ? images : []);
    const data = [
      productName,
      productTitle,
      productDesc,
      productPrice,
      productSize,
      productColor,
      product.likes,
      JSON.stringify(imagesfile),
      _id,
      sellerId,
    ];

    await executeQueryWithParams(updateProductQuery, data);
    const [updateData] = await executeQueryWithParams(isExistProductQuery, [
      _id,
      sellerId,
    ]);
    res
      .status(200)
      .json({ status: "success", message: "Product Updated!", updateData });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
