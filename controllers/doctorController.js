const Doctor = require("../models/doctor");
const {
  badRequestResponse,
  successResponse,
  accessDeniedResponse,
} = require("../utils/response");

exports.fetchAllDoctors = async (req, res) => {
  try {
    const allDoctors = await Doctor.find();
    console.log(allDoctors);
    return successResponse(res, "Successfully fetched", allDoctors);
  } catch (err) {
    console.log(err);
    return badRequestResponse(res, "Something Went wrong");
  }
};

exports.fetchDoctor = async (req, res) => {
  try {
    const doctor_id = req.user.user_id;
    if (!doctor_id) {
      return accessDeniedResponse(res, "Access Denied");
    }
    const doctor = await Doctor.findById({ _id: doctor_id });
    if (!doctor) {
      return badRequestResponse(res, "Not exists");
    }
    return successResponse(res, "Successfully fetched", doctor);
  } catch (err) {
    console.log(err);
    return badRequestResponse(res, "Invalid Request");
  }
};

exports.fetchDoctorDetails = async (req, res) => {
  try {
    const doctor_id = req.param("doctor_id");
    if (!doctor_id) {
      return badRequestResponse(res, "Incomplete request");
    }
    const doctorDetail = await Doctor.findOne({ _id: doctor_id });
    if (!doctorDetail) {
      return badRequestResponse(res, "Not exists");
    }
    return successResponse(res, "Fetched Successfully", doctorDetail);
  } catch (err) {
    console.log(err);
    return badRequestResponse(res, "Invalid Request");
  }
};
