const jwt = require("jsonwebtoken");
const User = require("../model/User.js");

const jwtSecret = "jkjJ1235Ohno!";

/**
 * Authorize middleware to be used on the routes to be secured
 */

const authorize = (req, res, next) => {
  var token = req.get("authorization");
  if (!token) return res.status(401).send("You are not authenticated.");

  jwt.verify(token, jwtSecret, (err, token) => {
    if (err) return res.status(401).send("Unable to parse token.");

    if (token.exp <= Date.now())
      return res.status(401).send("Token has expired.");

    let user = User.getUserFromList(token.user);
    if (!user) return res.status(401).send("User not found.");

    req.user = user;
    req.token = token;
    next();
  });
};

const sign = ({ username }) => {
  const exp = Date.now() + 24 * 60 * 60 * 1000; // 24h
  console.log("sign():", ...username);
  jwt.sign(...username, jwtSecret, (err, token) => {
    if (err) {
      console.error("sign()::", err);
      throw new Error("Sign error");
    }
    return token;
  });
};

module.exports = { authorize, sign };
