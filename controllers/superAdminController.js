const SpecializationList = require("../models/specialization");
const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/superAdmin");
const {
  badRequestResponse,
  createdSuccessResponse,
  successResponse,
  unauthorizedResponse,
  notFoundResponse,
} = require("../utils/response");
const { decryptPassword, encryptPassword } = require("../utils/utils");

exports.createSuperAdmin = async (req, res) => {
  const { email_id, password } = req.body;
  if (!(email_id && password)) {
    return badRequestResponse(res, "Incomplete details");
  }
  const existingUser = await SuperAdmin.findOne({ email_id: email_id });
  if (existingUser) {
    return badRequestResponse(res, "Already Exists");
  }
  const encryptedPassword = await encryptPassword(password);
  const superAdmin = SuperAdmin.create({
    email_id,
    password: encryptedPassword,
  });

  const token = await jwt.sign(
    { user_id: superAdmin.id, email_id },
    process.env.TOKEN_KEY
  );

  return createdSuccessResponse(res, "Created Successfully", {
    ...JSON.parse(JSON.stringify(superAdmin)),
    token,
  });
};

exports.login = async (req, res) => {
  const { email_id, password } = req.body;
  if (!(email_id && password)) {
    return badRequestResponse(res, "Incomplete details");
  }
  let superAdmin = await SuperAdmin.findOne({ email_id: email_id });
  console.log("ojash", superAdmin);
  if (superAdmin) {
    const isMatched = await decryptPassword(password, superAdmin.password);
    console.log("isMatched", isMatched);
    if (isMatched) {
      const token = await jwt.sign(
        { email_id: email_id },
        process.env.TOKEN_KEY
      );

      return successResponse(res, "Logged In Successfully", {
        ...JSON.parse(JSON.stringify(superAdmin)),
        token,
      });
    }
    return unauthorizedResponse(res, "Incorrect credentials");
  }
  return notFoundResponse(res, "User not found");
};

exports.addSpecialization = async (req, res) => {
  try {
    const { specialization } = req.body;
    if (!specialization) {
      return badRequestResponse(res, "Incomplete");
    }

    const existsSpecialization = await SpecializationList.findOne({
      specialization: specialization,
    });

    if (existsSpecialization) {
      return badRequestResponse(res, "Already added bro");
    }
    const newSpecialization = SpecializationList.create({
      specialization: specialization.toLowerCase(),
    });

    return successResponse(res, "Successfully Added");
  } catch (error) {
    console.log(error);
  }
};

exports.fetchAllSpecialization = async (req, res) => {
  try {
    const allData = await SpecializationList.find();
    return successResponse(res, "Successfully fetched", allData);
  } catch (err) {
    return badRequestResponse(res, "Something went wrong");
  }
};
