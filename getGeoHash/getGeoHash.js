const geo = require("geo-hash");
module.exports = function getGeoHash(lat, long) {
  return geo.encode(lat, long);
};
