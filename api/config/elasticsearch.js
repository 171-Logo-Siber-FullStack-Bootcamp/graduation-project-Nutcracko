//elastic search client
const { Client } = require("@elastic/elasticsearch");

//loading dotenv vars
require("dotenv").config();

const client = new Client({ node: process.env.ES_NODE });

module.exports = client;
