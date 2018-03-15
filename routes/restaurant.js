var express = require("express");
var router = express.Router();
const scrap = require("scrap");

const Restaurant_menu = require("../models/Restaurant_Menu");

let data = null;

router.get("/menu/", (req, res) => {
  let id = req.query.id;
  let link = req.query.link;
  if (id) {
    Restaurant_menu.findOne({ id: id }).exec((err, menu) => {
      if (!err) {
        if (menu === null) {
          scrap(link, (err, $) => {
            data = JSON.parse(
              $(".js-react-on-rails-component")
                .text()
                .trim()
            );
            console.log("Menu tags : ", data.restaurant.menu.menu_tags);
            var restaurant_menu = {
              id: data.restaurant.id,
              infos: {
                name: data.restaurant.name,
                name_with_branch: data.restaurant.name_with_branch,
                description: data.restaurant.description,
                newly_added: data.restaurant.newly_added,
                menu: { menu_tags: data.restaurant.menu.menu_tags },
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
            restaurant_menu.infos.image = {
              image_full: data.restaurant.image
                .replace(320, 100)
                .replace(180, 200),
              image_thumb: data.restaurant.image
                .replace(320, 120)
                .replace(180, 120)
            };
            let menu_tags_tab = [];
            data.restaurant.menu.menu_tags.map((item, index) => {
              return menu_tags_tab.push(item);
            });
            restaurant_menu.infos.menu.menu_tags = menu_tags_tab;

            var tab = [];
            data.menu.categories.map((item, index) => {
              return tab.push(item);
            });
            restaurant_menu.menu.categories = tab;

            var menuItem = [];
            data.menu.items.map(function(item) {
              return menuItem.push(item);
            });
            restaurant_menu.menu.items = menuItem;

            var newRestaurant_menu = new Restaurant_menu(restaurant_menu);

            // 4) Sauvegarder des documents
            newRestaurant_menu.save(
              function(err, obj) {
                if (err) {
                  console.log("something went wrong");
                } else {
                  console.log(
                    "we just saved the new restaurant menu " + obj.infos.name
                  );
                }
              },
              () => {
                //console.log("affichage du restaurant_menu", restaurant);
              }
            );
            return res.json(restaurant_menu);
          });
        } else {
          return res.json(menu);
        }
      } else {
        return res.status.json("409: lot of problems");
      }
    });
  } else {
    return res.status(400).json("err : id is missing");
  }
});

module.exports = router;
