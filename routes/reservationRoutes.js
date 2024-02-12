const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

router.get("/", reservationController.getAllReservations);
router.post(
  "/catways/:id/reservations",
  reservationController.createReservation
);
router.get(
  "/catways/:id/reservations/:reservationId",
  reservationController.getReservation
);
router.delete("/:reservationId", reservationController.deleteReservation);
router.get("/:reservationId", reservationController.getReservationDetails);

module.exports = router;
