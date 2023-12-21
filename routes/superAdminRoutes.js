const express = require("express");
const { authMiddleware } = require("../middleware/authMIddleware");
const {
  createSuperAdmin,
  addSpecialization,
  login,
  fetchAllSpecialization,
} = require("../controllers/superAdminController");

const router = express.Router();

router.post("/createSuperAdmin", createSuperAdmin);
router.post("/login", login);
router.post("/addSpecialization", authMiddleware, addSpecialization);
router.get("/fetchAllSpecialization", fetchAllSpecialization);

module.exports = router;
