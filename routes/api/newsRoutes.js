const router = require("express").Router();
const db = require("../../models/")

// Matches with "/api/newsRoutes/store"
router.route("/store")
  .post(function (req, res) {
    
  });

// Matches with "/api/newsRoutes/recall"
router.route("/recall")
  .get(function (req, res) {
    
  })

// Exporting the router
module.exports = router;
