//Route for handling search and filter requests
//router initiate
const router = require("express").Router();

//search controller
const searchController = require("../controllers/searchController");

//elastic search endpoint
router.get("/", (req, res) => {
  searchController.elasticSearch(req, res);
});

//filter by category endpoint
router.get("/filter/:categoryname", (req, res) => {
  searchController.elasticFilter(req, res);
});
module.exports = router;
