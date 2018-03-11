const getGeoHash = require("./getGeoHash");
const axios = require("axios");
const limitRestaurant = 30;
let element = [];

module.exports = function getRestaurantList(lat, long, cb) {
  let geohash = getGeoHash(lat, long);

  axios
    .get(
      `https://consumer-ow-api.deliveroo.com/orderapp/v2/restaurants?geohash=${geohash}`
    )
    .then(response => {
      const data = response.data.data;

      for (let i = 1; i < limitRestaurant; i++) {
        element.push({
          id: data[i].id,
          web: data[i].links.web
        });
      }
      res.json(element);
    })
    .catch(function(error) {
      return error;
    });
};
