var express = require("express");
var app = express();
var router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");

var bodyParser = require("body-parser");
var stripe = require("stripe")("sk_test_dVwLWXfQTv5VdiBTqkftDkxZ");
var axios = require("axios");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  User.findOne({ _id: id })
    // .populate({ path: "orders", model: Order })
    .exec(function(err, user) {
      if (id && !err) {
        Order.find({ users: id }).exec(function(err, order) {
          return res.json({
            user: user.id,
            orders: order
          });
        });
      } else {
        res.json("err bad");
      }
    });
});

module.exports = router;
