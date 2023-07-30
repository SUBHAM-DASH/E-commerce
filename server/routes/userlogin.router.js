const express = require("express");
const router = express.Router();

const {
  userlogin,
  getUserInformation,
} = require("../controllers/userlogin.controller");
const { auth } = require("../middleware/auth");

//login endpoint
router.post("/userlogin", userlogin);

//Get UserInformation
router.get("/getUserInformation", auth, getUserInformation);

module.exports = router;
