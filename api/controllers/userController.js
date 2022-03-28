//Controller for user processes
//Logger
const logger = require("../config/dev-logger");
//User model
const User = require("../models/User");

getUserCart = async (req, res) => {
  try {
    //finding user from userid taken from token
    const cart = await User.getUserCart(req.userid);
    //returning user cart
    res.send(cart);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/userController",
    });
    //returning error
    res.status(401).send("Error during getting user cart.");
  }
};

addProducttoCart = async (req, res) => {
  try {
    //userid taken from token and productid delivered by request body
    const updatedUser = await User.addPtoUserCart(
      req.userid,
      req.params.productid
    );

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

//clear all items from user cart
clearUserCart = async (req, res) => {
  try {
    //userid taken from token
    const updatedUser = await User.clearCart(req.userid);

    //returning updatedUser
    res.send(updatedUser);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/userController",
    });
    //returning error
    res.status(401).send("User cart could not be cleared.");
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

module.exports = { getUserCart, addProducttoCart, clearUserCart, userProfile };
