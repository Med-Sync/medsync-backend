const mongoose = require("mongoose");

exports.mongoConnect = async () => {
  try {
    const uri = process.env.MONGO_URL;
    await mongoose.connect(uri);

    mongoose.connection.on("error", () => {
      logError(err);
    });
    mongoose.connection.on("disconnect", () => {
      logError("MongoDB disconnected!");
    });

    console.log("Successfully connected to MongoATLAS");
  } catch (err) {
    console.log("Error connecting with MongoATLAS", err);
  }
};
