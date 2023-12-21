const mongoose = require("mongoose");

const specializationSchema = new mongoose.Schema({
  specialization: { type: String, unique: true },
});

module.exports = mongoose.model(
  "specializationList",
  specializationSchema,
  "specializationSchema"
);
