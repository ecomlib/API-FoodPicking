const scrap = require("scrap");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Restaurant = require("./modelRestaurant");
let data = null;

mongoose.connect("mongodb://localhost:27017/food-picking");

app.get("/restaurant-menu/:id", function(req, res) {
  let id = req.params.id;
  if (id) {
    Restaurant.findOne({ id: id }).exec(function(err, menu) {
      // console.log("menu.infos : .... ", menu);
      console.log("id", menu);
      // console.log("menu.infos.id", menu.infos.id);
      if (!err) {
        if (menu === null || menu.id !== id) {
          const link =
            "https://deliveroo.fr/menu/paris/3eme-temple/w-the-moon-charlot?day=today&time=ASAP";
          // "https://deliveroo.fr/fr/menu/paris/11eme-republique/rosa-parks";
          // "https://deliveroo.fr/fr/menu/paris/11eme-republique/pierre-sang";
          // "https://deliveroo.fr/fr/menu/paris/2eme-bourse/lemon-in-paris";

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
                  open: data.restaurant.open,
                  image: data.restaurant.image
                },
                menu: {
                  id: data.menu.id
                }
                // createdAt: { type: Date, default: Date.now }
              };
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
      }

      //
    });
    // } else
  } else {
    return res.status(400).json("err : id is missing");
  }
});

app.listen(process.env.PORT || 3000);
