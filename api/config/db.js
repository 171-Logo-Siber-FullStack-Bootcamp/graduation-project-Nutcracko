//importing pg library and Pool object
const Pool = require("pg").Pool;

//logger
const logger = require("./dev-logger");

//calling dotenv variables
require("dotenv").config();

//creating new pool
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

//logger for db connection
logger.info("Connected to DB!", { location: "config/DB" });

module.exports = pool;
