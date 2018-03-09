const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  id: String,
  type: String,
  attributes: {
    name: String,
    delivery_time: String,
    delivery_time_units: String,
    delivery_time_ranking: Number,
    image_url: String,
    price_category: Number,
    price_category_symbol: String,
    newly_added: Boolean,
    rating_percentage: Number,
    rating_formatted_count: String,
    delivery_status: String
  },
  relationships: {
    menu_tags: {
      data: [
        {
          id: String,
          type: String
        }
      ]
    }
  },
  links: {
    web: String
  }
});

module.exports = mongoose.model("Restaurants", RestaurantSchema);
