//search controller
//importing elastic search client
const elasticController = require("./elasticController");

//importing logger
const logger = require("../config/dev-logger");

const elasticSearch = async (req, res) => {
  try {
    var term;
    //if query does not exists throw error
    if (!req.query.term) {
      throw "No query exists!";
    } else {
      //search
      const search = await elasticController.elasticSearch(req.query.term);

      //return result
      return res.json(search);
    }
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/searchController",
    });
    //returning error
    res.status(400).send(error);
  }
};

const elasticFilter = async (req, res) => {
  try {
    if (!req.params.categoryname) {
      throw "Categoryname does not exists";
    }

    //filter with elasticsearch
    const filter = await elasticController.elasticFilter(
      req.params.categoryname
    );

    res.send(filter);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/searchController",
    });
    //returning error
    res.status(400).send(error);
  }
};

module.exports = { elasticSearch, elasticFilter };
