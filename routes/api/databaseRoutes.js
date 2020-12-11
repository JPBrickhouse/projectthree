const router = require("express").Router();
const db = require("../../models")

// Matches with "/api/databaseRoutes/store"
// POST data to the database
router.route("/store")
  .post(function (req, res) {
    db.NewsHistory.create(req.body, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    })
  });

// Matches with "/api/databaseRoutes/recall"
// GET data from the database
router.route("/recall")
  .get(function (req, res) {
    db.NewsHistory
      .find({}, (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.json(data);
        }
      })
      .sort({date: -1})
      .limit(5);
  })

// Matches with "/api/databaseRoutes/recall/:username"
// GET data from the database that corresponds to the username
router.route("/recall/:username")
  .get(function (req, res) {
    db.NewsHistory
      .find({ user: req.params.username }, (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.json(data);
        }
      })
      .sort({date: -1})
      .limit(5);
  })

// Exporting the router
module.exports = router;
