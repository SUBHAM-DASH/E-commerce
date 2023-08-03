const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const {
  userlogin,
  getUserInformation,
} = require("../controllers/userlogin.controller");

//login endpoint
router.post("/userlogin", userlogin);

//Get UserInformation
router.get("/getUserInformation", auth, getUserInformation);

module.exports = router;
