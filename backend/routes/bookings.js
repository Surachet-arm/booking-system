import express from "express";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const event = await Event.findById(req.body.eventId);
  const total = event.price * req.body.quantity;

  const booking = await Booking.create({
    user: req.user.id,
    event: event._id,
    quantity: req.body.quantity,
    totalPrice: total
  });

  res.json(booking);
});

router.get("/my", protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate("event");
  res.json(bookings);
});

router.get("/", protect, async (req, res) => {
  const bookings = await Booking.find()
    .populate("user", "email")
    .populate("event", "title date");

  res.json(bookings);
});

export default router;