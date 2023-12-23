const express = require("express");
const { authMiddleware } = require("../middleware/authMIddleware");
const {
  fetchAllDoctors,
  fetchDoctorDetails,
  fetchDoctor,
  applyToHospital,
} = require("../controllers/doctorController");

const router = express.Router();

router.get("/fetchAllDoctors", fetchAllDoctors);
router.get("/fetchDoctor", authMiddleware, fetchDoctor);
router.get("/fetchDoctor/:doctor_id", fetchDoctorDetails);
router.post("/hospital/apply/:hospital_id", authMiddleware, applyToHospital);

module.exports = router;
