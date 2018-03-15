var express = require("express");
var router = express.Router();

router.get("/home", function(req, res) {
  console.log("home page ");
});

module.exports = router;
