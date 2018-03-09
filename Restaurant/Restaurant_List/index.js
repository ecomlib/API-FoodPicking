const getGeoHash = require("../../Function/getGeoHash");

const axios = require("axios");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/foodpacking-app");

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
