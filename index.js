const getGeoHash = require("./Function/getGeoHash");
// const CircularJSON = require("circular-json");
// const circular = require("json-circular-stringify");
const axios = require("axios");
const mongoose = require("mongoose");
const express = require("express");
const Restaurants = require("./Models/restaurants_model");
//const getRestaurantList = require("./Function/getRestaurantList");

const app = express();

app.get("/", function(req, res) {
  var lat = req.query.lat;
  var lon = req.query.lon;

  let geohash = getGeoHash(lat, lon);
  console.log(geohash);
  axios
    .get(
      `https://consumer-ow-api.deliveroo.com/orderapp/v2/restaurants?geohash=${geohash}`
    )
    .then(response => {
      res.json(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is listenning");
});
