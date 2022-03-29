//LIBS
const router = require("express").Router();
const pool = require("../config/db");

//authentication controller imported
const authController = require("../controllers/authController");

//USER ROUTES
//user register route
router.post("/user/register", (req, res) => {
  authController.registerUser(req, res);
});
//user login route
router.post("/user/login", (req, res) => {
  authController.loginUser(req, res);
});

//user verify route
router.get("/user/activate", (req, res) => {
  authController.activateUser(req, res);
});

//!TEMPORARY
// router.get("/user", async (req, res) => {
//   const users = await pool.query("SELECT * FROM user_account");
//   res.send(users.rows);
// });

//SELLER ROUTES
//seller register routes
router.post("/seller/register", (req, res) => {
  authController.registerSeller(req, res);
});

//seller login routes
router.post("/seller/login", (req, res) => {
  authController.loginSeller(req, res);
});

//seller verifys seller accounts
router.get("/seller/activate", (req, res) => {
  authController.activateSeller(req, res);
});

//!TEMPORARY
// router.get("/sellers", async (req, res) => {
//   const sellers = await pool.query("SELECT * FROM seller_account");
//   res.send(sellers.rows);
// });

module.exports = router;
