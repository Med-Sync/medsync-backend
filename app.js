const express = require("express");
const morgan = require("morgan");
const { mongoConnect } = require("./config/mongooseClient");
const authRoutes = require("./routes/authRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const cors = require("cors");
const hospital = require("./models/hospital");
const superAdminRoutes = require("./routes/superAdminRoutes");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/hospital", hospitalRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/superAdmin", superAdminRoutes);

mongoConnect();

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
