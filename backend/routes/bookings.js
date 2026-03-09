import express from "express";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

const router = express.Router();

/* CREATE BOOKING */
router.post("/", async (req, res) => {

  try {

    const { eventId, quantity, totalPrice } = req.body;

    if (!eventId || !quantity || !totalPrice) {
      return res.status(400).json({ message: "Missing booking data" });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const booking = new Booking({
      event: eventId,
      quantity,
      totalPrice
    });

    await booking.save();

    res.json(booking);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: err.message });

  }

});

/* GET BOOKINGS */
router.get("/", async (req, res) => {

  try {

    const bookings = await Booking.find()
      .populate("event");

    res.json(bookings);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

});

export default router;