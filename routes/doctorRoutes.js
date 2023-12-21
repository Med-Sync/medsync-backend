const express = require("express");
const { authMiddleware } = require("../middleware/authMIddleware");
const {
  fetchAllDoctors,
  fetchDoctorDetails,
  fetchDoctor,
} = require("../controllers/doctorController");

const router = express.Router();

router.get("/fetchAllDoctors", authMiddleware, fetchAllDoctors);
router.get("/fetchDoctor", authMiddleware, fetchDoctor);
router.get("/fetchDoctor/:doctor_id", authMiddleware, fetchDoctorDetails);

module.exports = router;
