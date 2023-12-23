const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email_id: { type: String, unique: true },
  password: { type: String, required: true },
  // location: {
  //   type: { type: String, enum: ["Point"] },
  //   coordinates: { type: [Number], required: true },
  // },
});

module.exports = mongoose.model("patient", patientSchema, "patient");
