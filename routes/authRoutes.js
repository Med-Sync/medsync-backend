const express = require("express");
const {
  signup,
  login,
  signupDoctor,
  loginDoctor,
  signupHospital,
  loginHospital,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/signupDoctor", signupDoctor);
router.post("/signupHospital", signupHospital);
router.post("/login", login);
router.post("/loginDoctor", loginDoctor);
router.post("/loginHospital", loginHospital);

module.exports = router;
