const getGeoHash = require("./Function/getGeoHash");

const axios = require("axios");
const mongoose = require("mongoose");
const express = require("express");
const Restaurants = require("./Models/restaurants_model");

const app = express();

mongoose.connect("mongodb://localhost:27017/foodpacking-app");

app.get("/", function(req, res) {
  // Route en GET pour la récupération de la géoloc
  // Coté client il y avoir une route en post pour l'envoi de la géoloc.

  axios
    .get(
      "https://consumer-ow-api.deliveroo.com/orderapp/v2/restaurants?geohash=u09tuzu7bncf"
    )
    .then(function(response) {
      //Une fois que l'on récupère la géoloc, on fait appel à la fonction convert coordonate to geohash
      // let geo = getGeoHash(48.85674155317247, 2.3544311709702015);
      // console.log(geo);
      console.log(response);
      res.send(response);
    })
    .catch(function(error) {
      console.log(error);
    });

  //res.send("Hello World");
});

// axios.get("/", function() {});

//let test_hash = geo.encode(48.85674155317247, 2.3544311709702015);

// Route en GET pour la récupération de la géoloc
// Coté client il y avoir une route en post pour l'envoi de la géoloc.

// axios
//   .get(
//     "https://consumer-ow-api.deliveroo.com/orderapp/v2/restaurants?geohash=u09tuzu7bncf&page=scheduled",
//     {
//       params: {
//         ID: 12345
//       }
//     }
//   )
//   .then(function(response) {
// Une fois que l'on récupère la géoloc, on fait appel à la fonction convert coordonate to geohash
// let geo = getGeoHash(48.85674155317247, 2.3544311709702015);
//console.log(geo);
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

// axios
//   .get(
//     "https://consumer-ow-api.deliveroo.com/orderapp/v2/restaurants?geohash=u09tuzu7bncf&page=scheduled",
//     {
//       params: {
//         ID: 12345
//       }
//     }
//   )
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is listenning");
});
