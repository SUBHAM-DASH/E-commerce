const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const port = 5000;


//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();


//USER ENDPOINT APIS
app.use("/api/v1/user", require("./routes/userlogin.router"));

//PRODUCT ENDPOINT APIS
app.use("/api/v1/product", require("./routes/product.router"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
