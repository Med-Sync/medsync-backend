const express = require("express");
const { authMiddleware } = require("../middleware/authMIddleware");
const {
  addDoctor,
  fetchAllHospitals,
} = require("../controllers/hospitalController");

const router = express.Router();

router.post("/addDoctor", authMiddleware, addDoctor);
router.get("/fetchAllHospitals", authMiddleware, fetchAllHospitals);

module.exports = router;
