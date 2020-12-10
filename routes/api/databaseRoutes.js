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
router.route("/recall")
  .get(function (req, res) {
    db.NewsHistory.find({}, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
      }
    });
  })

// Exporting the router
module.exports = router;
