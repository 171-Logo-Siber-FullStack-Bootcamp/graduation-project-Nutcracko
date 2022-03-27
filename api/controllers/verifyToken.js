const jwt = require("jsonwebtoken");

userVerify = function (req, res, next) {
  const token = req.cookies.auth || req.headers.auth;
  if (!token) return res.status(401).send("Please Login to proceed further.");
  try {
    const userid = jwt.verify(token, process.env.USER_SECRET);
    req.userid = userid;
    req.isLoggedin = true;
    next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};

sellerVerify = function (req, res, next) {
  const token = req.cookies.sellerauth || req.headers.sellerauth;
  if (!token) return res.status(401).send("Please Login to proceed further.");
  try {
    const sellerid = jwt.verify(token, process.env.SELLER_SECRET);
    req.sellerid = sellerid;
    req.isLoggedin = true;
    next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};

module.exports.userVerify = userVerify;
module.exports.sellerVerify = sellerVerify;
