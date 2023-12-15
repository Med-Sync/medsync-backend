const express = require("express");
const morgan = require("morgan");
const { mongoConnect } = require("./config/mongooseClient");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);

mongoConnect();

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
