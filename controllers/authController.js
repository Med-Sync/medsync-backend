const User = require("../models/user");
const { encryptPassword, decryptPassword } = require("../utils/utils");
const {
  badRequestResponse,
  createdSuccessResponse,
  successResponse,
} = require("../utils/response");
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

  const pwd = await encryptPassword(password);

  const user = await User.create({
    first_name,
    last_name,
    email_id,
    password: pwd,
  });
  console.log(user);

  const token = await jwt.sign(
    { user_id: user.id, email_id },
    process.env.TOKEN_KEY
  );

  user.token = token;

  return createdSuccessResponse(res, "User created successfully", user);
};

exports.login = async (req, res) => {
  const { email_id, password } = req.body;
  if (!(email_id && password)) {
    return badRequestResponse(res, "Please enter all fields");
  }
  let user = await User.findOne({ email_id: email_id });

  if (user) {
    const isMatched = await decryptPassword(password, user.password);
    if (isMatched) {
      const token = await jwt.sign(
        {
          user_id: user.id,
          email_id,
        },
        process.env.TOKEN_KEY
      );
      user.token = token;
      return successResponse(res, "Logged in successfully", user);
    }
    return unauthorizedResponse(res, "Incorrect credentials");
  }
  return notFoundResponse(res, "User not found");
};
