const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");

exports.createReservation = async (req, res) => {
  const { catwayId, clientName, boatName, checkIn, checkOut } = req.body;
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.status(404).json({ message: "Catway not found" });
    }

    const reservation = new Reservation({
      catway: catway._id,
      clientName,
      boatName,
      checkIn,
      checkOut,
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res
      .status(500)
      .json({ message: "Error creating reservation", error: error.message });
  }
};

exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    if (!reservation) {
      return res.status(404).send("Reservation not found");
    }
    res.status(200).json(reservation);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).send(error.message);
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(
      req.params.reservationId
    );
    if (!reservation) {
      return res.status(404).send({ message: "Reservation not found" });
    }
    res.send({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting reservation" });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("catway");
    res.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).send({ message: "Error fetching reservations" });
  }
};

exports.getReservationDetails = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    if (!reservation) {
      return res.status(404).send("Reservation not found");
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
