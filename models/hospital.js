const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  hospitalName: { type: String },
  email_id: { type: String },
  password: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("hospital", hospitalSchema, "hospital");
