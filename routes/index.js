const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const catwayRoutes = require("./catwayRoutes");
const reservationRoutes = require("./reservationRoutes");

router.use("/auth", authRoutes);
router.use("/catways", catwayRoutes);
router.use("/reservations", reservationRoutes);

module.exports = router;
