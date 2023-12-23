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
    // const doctor_id = req.user.user_id;
    const allHospitals = await Hospital.find();
    return successResponse(res, "Fetched Successfully", allHospitals);
  } catch (err) {
    console.log(err);
    return badRequestResponse(res, "Something went wrong");
  }
};

exports.fetchHospitalsNearby = async (req, res) => {
  try {
    const { location, maxDistance } = req.body;
    const patient_coordinates = location.coordinates;
    const nearbyHospitals = await Hospital.aggregate([
      {
        $geoNear: {
          near: location,
          distanceField: "distance",
          maxDistance: maxDistance,
          spherical: true,
        },
      },
    ]);
    console.log(nearbyHospitals);
    return successResponse(res, "Successfully fetched", nearbyHospitals);
  } catch (err) {
    console.log(err);
    return badRequestResponse(res, "Something went wrong");
  }
};

exports.appliedDoctors = async (req, res) => {
  try {
    const { doctor_id } = req.body;
    const action = req.param["action"];
    const hospital_id = req.user.user_id;

    if (action == "accept") {
      const appliedDoctors = await Hospital.findOneAndUpdate(
        { _id: hospital_id },
        {
          $push: { doctors: doctor_id },
          $pull: { applied_doctors: doctor_id },
        }
      );
      const doctor = await Doctor.findByIdAndUpdate(doctor_id, {
        $push: { hospitals: hospital_id },
      });
      return successResponse(res, "Successfully accepted");
    } else if (action == "reject") {
      const appliedDoctors = await Hospital.findOneAndUpdate(
        { _id: hospital_id },
        {
          $pull: { applied_doctors: doctor_id },
        }
      );
      return successResponse(res, "Rejected");
    }
    return badRequestResponse(res, "Invalid Request");
  } catch (err) {
    return badRequestResponse(res, "Something went Wrong");
  }
};
