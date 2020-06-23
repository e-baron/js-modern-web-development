var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { headerTitle: 'JavaScript & Node.js full course',
pageTitle:'Demo : MPA with Express',
footerText:'Happy learning : )' });
});

module.exports = router;
