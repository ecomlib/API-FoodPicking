var express = require("express");
var app = express();
var router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const uid = require("uid");
const Restaurant_menu = require("../models/Restaurant_Menu");

var bodyParser = require("body-parser");
var axios = require("axios");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

router.post("/restaurants", (req, res) => {
  if (req.body.menu) {
    console.log("req", req.body.data);
    console.log("rest", req.body.menu);

    User.findOne({ _id: req.body.data }).exec(function(err, user) {
      if (req.body.data && !err) {
        user.restaurant_menu.push(req.body.menu);
        console.log("hello");
        user.save(function(err, obj) {
          if (err) {
            console.log("something went wrong");
          } else {
            console.log("we just saved the new order " + obj);
          }
        });
        return res.json(user.restaurant_menu);
      } else {
        res.json("err no saving");
      }
    });
  } else {
    res.json("err: no menu");
  }
});

router.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const restMenu = [];
  const restId = [];
  User.findById(id)
    .populate("restaurant_menu")
    .exec(function(err, user) {
      if (err) {
        console.log(err);
        // res.json(user);
      } else {
        console.log(user);
      }
    });

  //

  //   } else {
  //     res.json("err bad");
  //   }
});

module.exports = router;
