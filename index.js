const scrap = require("scrap");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Restaurant = require("./modelRestaurant");
let data = null;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/food-picking"
);

app.get("/restaurant-menu/", function(req, res) {
  let id = req.query.id;
  let link = req.query.link;
  // console.log(link);
  if (id) {
    Restaurant.findOne({ id: id }).exec(function(err, menu) {
      if (!err) {
        if (menu === null) {
          scrap(
            link,
            function(err, $) {
              data = JSON.parse(
                $(".js-react-on-rails-component")
                  .text()
                  .trim()
              );
              var restaurant = {
                id: data.restaurant.id,
                infos: {
                  name: data.restaurant.name,
                  name_with_branch: data.restaurant.name_with_branch,
                  description: data.restaurant.description,
                  newly_added: data.restaurant.newly_added,
                  price_category: data.restaurant.price_category,
                  opens_at: data.restaurant.opens_at,
                  closes_at: data.restaurant.closes_at,
                  street_address: data.restaurant.street_address,
                  post_code: data.restaurant.post_code,
                  neighborhood: data.restaurant.neighborhood,
                  phone_numbers: {
                    primary: data.restaurant.phone_numbers.primary,
                    secondary: data.restaurant.phone_numbers.secondary
                  },
                  city: data.restaurant.city,
                  open: data.restaurant.open
                },
                menu: {
                  id: data.menu.id
                }
                // createdAt: { type: Date, default: Date.now }
              };
              restaurant.infos.image = {
                image_full: data.restaurant.image
                  .replace(320, 100)
                  .replace(180, 200),
                image_thumb: data.restaurant.image
                  .replace(320, 120)
                  .replace(180, 120)
              };
              console.log("id", restaurant.menu.image);
              var tab = [];

              for (let i = 0; i < data.menu.categories.length; i++) {
                tab.push({
                  id: data.menu.categories[i].id,
                  description: data.menu.categories[i].description,
                  name: data.menu.categories[i].name,
                  sort_order: data.menu.categories[i].sort_order,
                  top_level: data.menu.categories[i].top_level,
                  unique_id: data.menu.categories[i].unique_id
                });
              }
              var menuItem = [];
              data.menu.items.map(function(item) {
                return menuItem.push(item);
              });
              restaurant.menu.items = menuItem;

              restaurant.menu.categories = tab;
              var newRestaurant = new Restaurant(restaurant);
              //console.log("info . id : ", infos.id);
              // 4) Sauvegarder des documents
              newRestaurant.save(
                function(err, obj) {
                  if (err) {
                    console.log("something went wrong");
                  } else {
                    console.log(
                      "we just saved the new restaurant " + obj.infos.name
                    );
                  }
                },
                () => {
                  // console.log("youssef", menu);
                }
              );
              return res.json(restaurant);
            }

            // } else {
            //   res.status(400).json("err 403 : error");
            //   // 3) Créer des documents

            //   console.log("data", restaurant.menu.items.length);
            //   // }
            // }
          );
        } else {
          return res.json(menu);
          // (!err && restaurant.infos.id !== id)
        }
      } else {
        return res.status.json("409: lot of problems");
      }

      //
    });
    // } else
  } else {
    return res.status(400).json("err : id is missing");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is up");
});
