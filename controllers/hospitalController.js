const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");
const { badRequestResponse, successResponse } = require("../utils/response");

exports.addDoctor = (req, res) => {
  const { first_name, last_name, email_id, specialization, time_slot } =
    req.body;
  const hospital_id = req.user.user_id;

  const hospital = Hospital.findByIdAndUpdate(hospital_id, {});
};

exports.fetchAllHospitals = async (req, res) => {
  try {
    const doctor_id = req.user.user_id;
    const allHospitals = await Hospital.find();
    return successResponse(res, "Fetched Successfully", allHospitals);
  } catch (err) {
    console.log(err);
    return badRequestResponse(res, "Something went wrong");
  }
};
