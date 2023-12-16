const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");
const { encryptPassword, decryptPassword } = require("../utils/utils");
const {
  badRequestResponse,
  createdSuccessResponse,
  successResponse,
} = require("../utils/response");
const ROLES = require("../constants");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { email_id, password, first_name, last_name } = req.body;

  if (!(email_id && password && first_name && last_name)) {
    return badRequestResponse(res, "Incomplete Details Entered");
  }

  const existingUser = await Patient.findOne({ email_id: email_id });
  if (existingUser) {
    return badRequestResponse(res, "Email Id already exists");
  }

  const ecryptedPassword = await encryptPassword(password);

  const patient = await Patient.create({
    first_name,
    last_name,
    email_id,
    password: ecryptedPassword,
  });
  console.log(patient);

  const token = await jwt.sign(
    { user_id: patient.id, email_id },
    process.env.TOKEN_KEY
  );

  patient.token = token;

  return createdSuccessResponse(res, "User created successfully", patient);
};

exports.signupHospital = async (req, res) => {
  const { email_id, password, hospitalName } = req.body;

  if (!(email_id && password && hospitalName)) {
    return badRequestResponse(res, "Incomplete Details Entered");
  }

  const existingHospital = await Hospital.findOne({ email_id: email_id });
  if (existingHospital) {
    return badRequestResponse(res, "Email Id already exists");
  }

  const ecryptedPassword = await encryptPassword(password);

  const hospital = await Hospital.create({
    hospitalName,
    email_id,
    password: ecryptedPassword,
  });
  console.log(patient);

  const token = await jwt.sign(
    { user_id: patient.id, email_id },
    process.env.TOKEN_KEY
  );

  hospital.token = token;

  return createdSuccessResponse(res, "Hospital created successfully", hospital);
};

exports.signupDoctor = async (req, res) => {
  const {
    first_name,
    last_name,
    email_id,
    password,
    specialization,
    time_slot,
  } = req.body;
  if (
    !(
      first_name &&
      last_name &&
      email_id &&
      password &&
      specialization &&
      time_slot
    )
  ) {
    return badRequestResponse(res, "Incomplete details");
  }
  const existingDoctor = await Doctor.findOne({ email_id });
  if (existingDoctor) {
    return badRequestResponse(res, "Doctor already exists");
  }
  const ecryptedPassword = await encryptPassword(password);
  const doctor = await Doctor.create({
    first_name,
    last_name,
    email_id,
    password: ecryptedPassword,
    specialization,
    time_slot,
  });
  const token = await jwt.sign(
    { user_id: doctor.id, email_id },
    process.env.TOKEN_KEY
  );
  doctor.token = token;
  return createdSuccessResponse(res, "Doctor created successfully", doctor);
};

exports.login = async (req, res) => {
  const { email_id, password } = req.body;
  if (!(email_id && password)) {
    return badRequestResponse(res, "Please enter all fields");
  }
  let patient = await Patient.findOne({ email_id: email_id });

  if (patient) {
    const isMatched = await decryptPassword(password, patient.password);
    if (isMatched) {
      const token = await jwt.sign(
        {
          user_id: patient.id,
          email_id,
        },
        process.env.TOKEN_KEY
      );
      patient.token = token;
      const responseData = { accessToken: patient.token };
      return successResponse(res, "Logged in successfully", responseData);
    }
    return unauthorizedResponse(res, "Incorrect credentials");
  }
  return notFoundResponse(res, "User not found");
};

exports.loginDoctor = async (req, res) => {
  const { email_id, password } = req.body;
  if (!(email_id && password)) {
    return badRequestResponse(res, "Please enter all fields");
  }
  let doctor = await Doctor.findOne({ email_id: email_id });

  if (doctor) {
    const isMatched = await decryptPassword(password, doctor.password);
    if (isMatched) {
      const token = await jwt.sign(
        {
          user_id: doctor.id,
          email_id,
        },
        process.env.TOKEN_KEY
      );
      doctor.token = token;
      const responseData = { accessToken: doctor.token };
      return successResponse(res, "Logged in successfully", responseData);
    }
    return unauthorizedResponse(res, "Incorrect credentials");
  }
  return notFoundResponse(res, "User not found");
};
