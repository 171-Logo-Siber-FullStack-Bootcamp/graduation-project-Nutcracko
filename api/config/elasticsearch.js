//elastic search client
const { Client } = require("@elastic/elasticsearch");

//loading dotenv vars
require("dotenv").config();

const client = new Client({ node: process.env.ES_NODE });

client.ping(
  {
    requestTimeout: 1000,
  },
  function (error) {
    if (error) {
      console.log(`ERROR in Elastic Search Connection:${error}`);
    } else {
      console.log("Connected to Elastic Search!");
    }
  }
);

module.exports = client;
