const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middleware/auth");
const { addSellerProduct } = require("../controllers/product.controller");
const fs = require("fs");

let dir = "./uploads/product_images";
if(!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}


//Image Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/product_images");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
const product_uploads = upload.fields([{ name: "image", maxCount: 6 }]);

//************************ Add Seller Product ******************//
router.post("/addSellerProduct", auth, product_uploads, addSellerProduct);

module.exports = router;
