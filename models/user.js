const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email_id: { type: String, unique: true },
  password: { type: String, required: true },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema, "user");
