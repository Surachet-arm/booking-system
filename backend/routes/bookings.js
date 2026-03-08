import express from "express";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

const router = express.Router();

/* CREATE BOOKING */
router.post("/", async (req, res) => {
  try {
    const { eventId, quantity, totalPrice, userId } = req.body;
    const parsedQuantity = Number(quantity);
    const parsedTotalPrice = Number(totalPrice);

    if (!eventId || !userId || !parsedQuantity || Number.isNaN(parsedTotalPrice)) {
      return res.status(400).json({ message: "eventId, quantity, totalPrice, and userId are required" });
    }

    const booking = new Booking({
      user: userId,
      event: eventId,
      quantity: parsedQuantity,
      totalPrice: parsedTotalPrice
    });

    await booking.save();

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.booked = (event.booked || 0) + parsedQuantity;
    await event.save();

    res.json(booking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

/* GET BOOKINGS */
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("event")
      .populate("user");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
