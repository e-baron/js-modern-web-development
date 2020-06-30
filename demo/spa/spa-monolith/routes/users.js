var express = require("express");
var router = express.Router();
var User = require("../model/User.js");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* POST user data for authentication */
router.post("/login", function (req, res, next) {
  let user = new User(req.body.email, req.body.email, req.body.password);
  console.log("POST users/login:", User.list);
  if (user.checkCredentials(req.body.email, req.body.password)) {
    // manage session data
    req.session.isAuthenticated = true;
    req.session.user = req.body.email;
    return res.json({ user: req.session.user });
  } else {
    res.status(401).send("bad email/password");
  }
});

/* POST a new user */
router.post("/", function (req, res, next) {
  console.log("POST users/", User.list);
  console.log("email:",req.body.email);
  if (User.isUser(req.body.email))
    //return res.status(409).send({error:"This user already exists."});
    return res.status(409).end();
  let newUser = new User(req.body.email, req.body.email, req.body.password);
  newUser.save();

  // manage session data
  req.session.isAuthenticated = true;
  req.session.user = req.body.email;
  res.status(200).send({username:req.body.email});
});



module.exports = router;
