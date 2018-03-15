var express = require("express");
var app = express();
var router = express.Router();

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

router.post("/order", (req, res) => {
  if (req.body.token) {
    console.log("tok", req.body.token);
    console.log("amount", req.body.total);
    const { name } = req.body.token.card;
    stripe.charges.create(
      {
        amount: req.body.total * 100,
        currency: "eur",
        source: "tok_bypassPending", // utilisez les token de test comme celui-ci
        description: `Charge for ${name}`,
        metadata: { order_id: 6735 }
      },
      function(err, charge) {
        console.log(err, charge);
      }
    );
  } else {
    console.log("Aucun Token transmis");
  }
});

module.exports = router;
