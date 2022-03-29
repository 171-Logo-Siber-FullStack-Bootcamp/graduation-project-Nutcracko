//Route for handling search and filter requests
//router initiate
const router = require("express").Router();

//search controller
const searchController = require("../controllers/searchController");

router.get("/", (req, res) => {
  searchController.elasticSearch(req, res);
});

router.get("/filter/:categoryname", (req, res) => {
  searchController.elasticFilter(req, res);
});
module.exports = router;
