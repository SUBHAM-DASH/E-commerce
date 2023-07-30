const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const port = 5000;

//middleware
app.use(express.json());
app.use(cors());
dotenv.config();


//USER ENDPOINT APIS
app.use("/api/v1/user", require("./routes/userlogin.router"));



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
