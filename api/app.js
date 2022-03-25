//LIBS TO USE
//Express
const express = require("express");
const app = express();
const path = require("path");

//cors
const cors = require("cors");

//Cookie handling lib
const cookieParser = require("cookie-parser");

//Logger
//Dev logger
const logger = require("./config/dev-logger");

//Production logger config
// const logger = require("./config/prod-logger");

//Database connection
const pool = require("./config/db");

//Loading dotenv vars
require("dotenv").config();

//importing routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");

//middleware
app.use("/static", express.static("public")); //serving static files
app.use(cors());
app.use(cookieParser());
app.use(express.json()); //json parser
app.use(express.urlencoded({ extended: true }));

//Signing Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);

//application port configuration
const port = process.env.PORT || 3030;

//starting server listener
app.listen(port, () => {
  logger.info(`Application is running on ${port}.`, { location: "./app" });
});
