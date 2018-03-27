var mongoose = require("mongoose");

// data.menu = items data.restaurant = infos du restau

// 1) Definir le schema - A faire qu'une fois
var RestaurantSchema = new mongoose.Schema({
  id: String,
  infos: {
    name: String,
    name_with_branch: String,
    description: String,
    newly_added: Boolean,
    menu: { menu_tags: [] },
    price_category: Number,

    opens_at: String,
    closes_at: String,
    street_address: String,
    post_code: String,
    neighborhood: String,
    phone_numbers: { primary: String, secondary: String },
    city: String,
    open: Boolean,
    image: { image_full: String, image_thumb: String }
  },
  menu: {
    id: Number,
    categories: [
      {
        id: Number,
        description: String,
        name: String,
        sort_order: Number,
        top_level: Boolean,
        unique_id: Number
      }
    ],
    // modifier_groups: [
    //   {
    //     id: Number,
    //     name: String,
    //     instruction: String,
    //     min_selection_points: Number,
    //     max_selection_points: Number,
    //     allow_multiple_same_item: Boolean,
    //     modifier_options: [
    //       {
    //         id: Number,
    //         uid: Number,
    //         name: String,
    //         description: String,
    //         modifier_groups: [],
    //         price: Number
    //       }
    //     ]
    //   }
    // ],
    items: [
      {
        id: Number,
        uid: Number,
        name: String,
        description: String,
        price: String,
        raw_price: Number,
        alt_mod_price: Number,
        sort_order: Number,
        popular: Boolean,
        alcohol: Boolean,
        category_id: Number,
        image: String,
        modifier_groups: [Number],
        quantity: Number
      }
    ]
  },
  // users: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: { type: Date, default: Date.now }
});
// 2) Definir le model - A faire qu'une fois
//var Restaurant = mongoose.model("Restaurant", RestaurantSchema);

// module.exports = mongoose.model("Restaurant", RestaurantSchema);
module.exports = mongoose.model(
  "Restaurant_menu",
  RestaurantSchema,
  "restaurant_menus"
);
