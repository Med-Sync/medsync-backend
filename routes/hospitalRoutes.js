const express = require("express");
const { authMiddleware } = require("../middleware/authMIddleware");
const {
  addDoctor,
  fetchAllHospitals,
  appliedDoctors,
  fetchHospitalsNearby,
} = require("../controllers/hospitalController");

const router = express.Router();

router.post("/addDoctor", authMiddleware, addDoctor);
router.get("/fetchAllHospitals", fetchAllHospitals);
router.post("/doctor/applied/:action", authMiddleware, appliedDoctors);
router.post("/nearbyHospitals", fetchHospitalsNearby);

module.exports = router;
