const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { executeQuery, executeQueryWithParams } = require("../db");
const { v4: uuidv4, v5: uuidv5, validate: uuidValidate } = require("uuid");
const {
  emailExistOrNot,
  insertEmailPass,
  getUserInformationQuery,
} = require("../sql/user.query");


//User Login
exports.userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide email and password",
      });
    }
    const [result] = await executeQueryWithParams(emailExistOrNot, [email]);
    if (result) {
      const token = jwt.sign(result._id, process.env.JWT_SECRET);
      res
        .status(200)
        .json({ status: "success", message: "Login Successfully", token });
    } else {
      const _id = uuidv4().toString();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const data = [_id, email, hashedPassword];
      await executeQueryWithParams(insertEmailPass, data);
      const token = jwt.sign(_id, process.env.JWT_SECRET);
      res
        .status(200)
        .json({ status: "success", message: "Login Successfully", token });
    }
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

//Get Use Information
exports.getUserInformation = async (req, res) => {
  try {
    const id = req.user;
    const [userInfo] = await executeQueryWithParams(getUserInformationQuery, [
      id,
    ]);
    res.status(200).json({ status: "success", data: userInfo });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
