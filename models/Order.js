var mongoose = require("mongoose");
// Le package `mongoose-simple-random` permet de récupérer aléatoirement des documents dans une collection
var random = require("mongoose-simple-random");

var OrderSchema = new mongoose.Schema({
  order: String,

  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

OrderSchema.plugin(random);

module.exports = mongoose.model("Order", OrderSchema, "orders");
