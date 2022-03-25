//Controller for user processes
//Logger
const logger = require("../config/dev-logger");
//User model
const User = require("../models/User");

getUserCart = (req, res) => {
  try {
    //finding user from userid taken from token
    const user = User.getUserByID(req.userid);
    //returning user cart
    res.send(user.rows[0].cart);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/userController",
    });
    //returning error
    res.status(401).send("Product could not be added to cart.");
  }
};

addProducttoCart = (req, res) => {
  try {
    //userid taken from token and productid delivered by request body
    const updatedUser = User.addPtoUserCart(req.userid, req.params.productid);

    //returning updatedUser
    res.send(updatedUser);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/userController",
    });
    //returning error
    res.status(401).send("Product could not be added to cart.");
  }
};

userProfile = (req, res) => {
  try {
    //getting userid from request
    const userid = req.userid;
    if (!req.userid) {
      throw "Please log-in to reach user profile.";
    }

    //getting user information with userid
    const user = User.getUserByID(userid);

    //returning user
    return user.rows[0];
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/userController",
    });
    //returning error
    res.status(404).send(error);
  }
};

module.exports = { addProducttoCart, userProfile };
