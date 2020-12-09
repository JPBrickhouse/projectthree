const router = require("express").Router();
const databaseRoutes = require("./databaseRoutes");
const externalRoutes = require("./externalRoutes");

// News Routes
router.use("/databaseRoutes", databaseRoutes);

// External API Routes
router.use("/externalRoutes",externalRoutes)

module.exports = router;
