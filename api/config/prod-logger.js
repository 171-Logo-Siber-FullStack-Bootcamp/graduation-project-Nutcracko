//logger in JSON format
const { format, createLogger, transports } = require("winston");
const { timestamp, combine, errors, json } = format;

const logger = createLogger({
  format: combine(timestamp(), errors({ stack: true }), json()),
  defaultMeta: { service: "Ecommerce-service" },
  transports: [new transports.Console()],
});

module.exports = logger;
