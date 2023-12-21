const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
  email_id: { type: String },
  password: { type: String },
  specializationList: [{ type: String, required: false }],
});

module.exports = mongoose.model("superAdmin", superAdminSchema, "superAdmin");
