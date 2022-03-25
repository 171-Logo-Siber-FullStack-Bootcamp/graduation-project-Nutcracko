//USER AUTHENTICATION CONTROLLER
//IMPORTING LIBS

//DB MODELS
const User = require("../models/User");
const Seller = require("../models/Seller");

//Logger
const logger = require("../config/dev-logger");

//validators
const {
  registerValidation,
  loginValidation,
  sellerRegisterValidation,
  sellerLoginValidation,
} = require("../validators/authValidators");

//mail middleware
const mailer = require("../middleware/mail");

//bcrypt for hashing passwords and jwt for creating auth tokens
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//! USER AUTHS
//User register
registerUser = async (req, res) => {
  try {
    //json olmayan req denyla
    if (req.header("Content-Type") !== "application/json") {
      throw "The req should be in JSON format";
    }
    //validation
    const isValid = await registerValidation(req.body);

    if (isValid.error) {
      throw isValid.error.details[0].message;
    }

    //check if email already exists
    const emailExists = await User.emailExists(req.body.email);

    //throwing error if email already exists in DB
    if (emailExists) {
      throw "Email is already connected to an account.";
    }

    //check if username exists in DB
    const usernameExists = await User.usernameExists(req.body.username);

    //throwing error if username exists in DB
    if (usernameExists) {
      throw "Username already exists";
    }

    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    //creating user
    const user = new User(req.body.username, req.body.email, hashedPass);

    //saving user to DB
    const savedUser = await user.saveUser();

    //logging saved user
    logger.info(`A new user created in DB: \n ${savedUser}`, {
      meta: "user_register",
    });

    //TODO: Send account verification mail
    // const error = mailer(savedUser);

    //send response
    return res.send(savedUser);
  } catch (error) {
    logger.error(new Error(error), { location: "./controller/authController" });
    //returning error
    return res.status(400).send(error);
  }
};

//User login
loginUser = async (req, res) => {
  try {
    //json olmayan req denyla
    if (req.header("Content-Type") !== "application/json") {
      throw "The req should be in JSON format";
    }

    //validation
    const isValid = await loginValidation(req.body);

    if (isValid.error) {
      throw isValid.error.details[0].message;
    }

    //check if email exists
    const userFound = await User.getUserByEmail(req.body.email);
    if (!userFound) {
      throw "Login credentials are wrong.";
    }

    //TODO: Account must be verified here

    //compare password
    const validPass = await bcrypt.compare(
      req.body.password,
      userFound.password
    );

    if (!validPass) {
      throw "Login credentials are wrong.";
    }

    //create jwt
    const token = jwt.sign(userFound.u_id, process.env.USER_SECRET);

    //sign it to cookie
    res.cookie("auth", token, { maxAge: 1000 * 60 * 60 * 5 });

    //logging user logged in
    logger.info(`A user just logged in: \n ${userFound.username}`, {
      meta: "user_log-in",
    });

    return res.send("Successfull Login.");
  } catch (error) {
    logger.error(new Error(error), { location: "./controller/authController" });
    //returning error
    return res.status(400).send(error);
  }
};

activateUser = (req, res) => {};

//! SELLER AUTHS

//Seller register
registerSeller = async (req, res) => {
  try {
    //json olmayan req denyla
    if (req.header("Content-Type") !== "application/json") {
      throw "The req should be in JSON format";
    }
    //validation
    const isValid = await sellerRegisterValidation(req.body);

    if (isValid.error) {
      throw isValid.error.details[0].message;
    }

    //check if email already exists
    const emailExists = await Seller.emailExists(req.body.email);

    //throwing error if email already exists in DB
    if (emailExists) {
      throw "Email is already connected to an account.";
    }

    //check if username exists in DB
    const usernameExists = await Seller.usernameExists(req.body.username);

    //throwing error if username exists in DB
    if (usernameExists) {
      throw "Username already exists";
    }

    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    //creating new seller
    const seller = new Seller(
      req.body.username,
      req.body.email,
      hashedPass,
      []
    );

    //saving admin to DB
    const savedSeller = await seller.saveSeller();

    //TODO: Send account verification mail
    // const error = mailer(savedUser);

    //logging saved admin
    logger.info(`A new Seller created in DB: \n ${savedSeller}`, {
      meta: "seller_register",
    });

    //send response
    return res.send(savedSeller);
  } catch (error) {
    logger.error(new Error(error), { location: "./controller/authController" });
    //returning error
    return res.status(400).send(error);
  }
};

//Seller login controller
loginSeller = async (req, res) => {
  try {
    //json olmayan req denyla
    if (req.header("Content-Type") !== "application/json") {
      throw "The req should be in JSON format";
    }

    //validation
    const isValid = await sellerLoginValidation(req.body);

    if (isValid.error) {
      throw isValid.error.details[0].message;
    }

    //check if email exists
    const sellerFound = await Seller.getSellerByEmail(req.body.email);
    if (!sellerFound) {
      throw "Login credentials are wrong.";
    }

    //TODO: Account must be verified here

    //compare password
    const validPass = await bcrypt.compare(
      req.body.password,
      sellerFound.password
    );

    if (!validPass) {
      throw "Login credentials are wrong.";
    }

    //create jwt
    const token = jwt.sign(
      { _id: sellerFound.s_id },
      process.env.SELLER_SECRET
    );

    //sign it to cookie
    res.cookie("sellerauth", token, { maxAge: 1000 * 60 * 60 * 5 });

    //logging logged in user
    logger.info(`A Seller just logged in: \n ${sellerFound.username}`, {
      meta: "seller_log-in",
    });

    return res.send("Successfull Login.");
  } catch (error) {
    logger.error(new Error(error), { location: "./controller/authController" });
    //returning error
    return res.status(400).send(error);
  }
};

activateSeller = (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  activateUser,
  registerSeller,
  loginSeller,
  activateSeller,
};
