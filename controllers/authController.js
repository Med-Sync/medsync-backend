const User = require("../models/user");
const { encryptPassword } = require("../utils/utils");
const { badRequestResponse } = require("../utils/response");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { email_id, password, first_name, last_name } = req.body;

  if (!(email_id && password && first_name && last_name)) {
    return badRequestResponse(res, "Incomplete Details Entered");
  }
  const existingUser = await User.findOne({ email_id: email_id });
  if (existingUser) {
    return badRequestResponse(res, "Email Id already exists");
  }

  const pwd = encryptPassword(password);

  const user = User.create({
    first_name,
    last_name,
    email_id,
    password: pwd,
  });

  const token = jwt.sign({ user_id: user.id, email_id }, process.env.TOKEN_KEY);

  user.token = token;
};
