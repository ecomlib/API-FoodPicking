var express = require("express");
var app = express();
var router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");

var bodyParser = require("body-parser");
var stripe = require("stripe")("sk_test_dVwLWXfQTv5VdiBTqkftDkxZ");
var axios = require("axios");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  User.findOne({ _id: id })
    // .populate({ path: "orders", model: Order })
    .exec(function(err, user) {
      if (id && !err) {
        Order.find({ users: id }).exec(function(err, order) {
          return res.json({
            user: user.id,
            orders: order
          });
        });
      } else {
        res.json("err bad");
      }
    });
});
//   if (req.body.token) {
//     const token = req.body.token;
//     const total = req.body.total;
//     const id = req.body.data;
//     console.log("test", req.body.data);
//     const { name } = req.body.token.card;
//     stripe.charges.create(
//       {
//         amount: req.body.total * 100,
//         currency: "eur",
//         source: "tok_bypassPending", // utilisez les token de test comme celui-ci
//         description: `Charge for ${name}`,
//         metadata: { order_id: 6735 }
//       },
//       function(err, charge) {
//         if (err) {
//           res.end();
//           console.log(err);
//         } else {
//           var order = new Order({
//             hour: req.body.chosenHour,
//             items: req.body.items,
//             total: req.body.total,
//             users: req.body.data
//           });
//           order.save(
//             function(err, obj) {
//               if (err) {
//                 console.log("something went wrong");
//               } else {
//                 console.log("we just saved the new order " + obj);
//               }
//             },
//             () => {
//               //console.log("affichage du restaurant_menu", restaurant);
//             }
//           );
//           User.findOne({ _id: req.body.data }).exec(function(err, user) {
//             if (req.body.data && !err) {
//               user.account.orders.push(order.id);

//               user.save(function(err, obj) {
//                 if (err) {
//                   console.log("something went wrong");
//                 } else {
//                   console.log("we just saved the new order " + obj);
//                 }
//               });
//               return res.json({
//                 charge,
//                 total,
//                 id: req.body.data,
//                 items: req.body.items
//               });
//             } else {
//               res.json("err");
//             }
//             console.log(id);
//           });

//           console.log("The author is %s", order.users);

//           // prints "The author is Ian Fleming"

//           // Order.findOne({ id: req.body.data })
//           //   .populate("user")
//           //   .exec(function(err, story) {
//           //     if (err) return handleError(err);
//           //     console.log("The author is %s", order.user);
//           //     // prints "The author is Ian Fleming"
//           //   });

//           console.log(err, charge);
//         }
//       }
//     );
//   } else {
//     console.log("Aucun Token transmis");
//   }
// });

module.exports = router;
