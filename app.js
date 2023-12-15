const express = require("express");
const morgan = require("morgan");
const { mongoConnect } = require("./config/mongooseClient");
require("dotenv").config();

const cors = app.use("cors");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

mongoConnect();

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
