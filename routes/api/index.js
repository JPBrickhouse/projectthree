const router = require("express").Router();
const newsRoutes = require("./newsRoutes");
const externalRoutes = require("./externalRoutes");

// News Routes
router.use("/newsRoutes", newsRoutes);

// External API Routes
router.use("/externalRoutes",externalRoutes)

module.exports = router;
