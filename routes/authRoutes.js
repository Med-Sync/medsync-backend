const express = require("express");
const {
  signup,
  login,
  signupDoctor,
  loginDoctor,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/signupDoctor", signupDoctor);
router.post("/login", login);
router.post("/loginDoctor", loginDoctor);

module.exports = router;
