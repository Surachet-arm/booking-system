import express from "express";
import Event from "../models/Event.js";
import multer from "multer";
import Booking from "../models/Booking.js";

const router = express.Router();

/* STORAGE CONFIG */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* GET ALL EVENTS */
router.get("/", async (req, res) => {
  try {

    const events = await Event.find().sort({ date: 1 }).lean();
    const bookings = await Booking.find().lean();

    const eventsWithBookings = events.map(event => {

      const booked = bookings
        .filter(b => b.event.toString() === event._id.toString())
        .reduce((sum, b) => sum + (b.quantity || 1), 0);

      return {
        ...event,
        booked,
        remaining: Math.max(event.capacity - booked, 0)
      };

    });

    res.json(eventsWithBookings);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET EVENT BY ID */
router.get("/:id", async (req, res) => {
  try {

    const event = await Event.findById(req.params.id).lean();

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const bookings = await Booking.find({ event: event._id });

    const booked = bookings.reduce(
      (sum, b) => sum + (b.quantity || 1),
      0
    );

    res.json({
      ...event,
      booked,
      remaining: Math.max(event.capacity - booked, 0)
    });

  } catch (err) {
    res.status(404).json({ message: "Event not found" });
  }
});

/* CREATE EVENT */
router.post("/", upload.single("image"), async (req, res) => {
  try {

    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      price: req.body.price,
      capacity: req.body.capacity,
      image: req.file ? req.file.filename : ""
    });

    await event.save();

    res.json(event);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* UPDATE EVENT */
router.put("/:id", upload.single("image"), async (req, res) => {

  try {

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      price: req.body.price,
      capacity: req.body.capacity
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(event);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

});

/* DELETE EVENT */
router.delete("/:id", async (req, res) => {
  try {

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Event deleted" });

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
});

/* BOOK EVENT (เพิ่มจำนวนคนจอง) */
router.post("/:id/book", async (req, res) => {

  try {

    const { quantity } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const bookings = await Booking.find({ event: event._id });

    const booked = bookings.reduce(
      (sum, b) => sum + (b.quantity || 1),
      0
    );

    if (booked + quantity > event.capacity) {
      return res.status(400).json({ message: "Tickets sold out" });
    }

    res.json({
      message: "Booking available",
      remaining: event.capacity - (booked + quantity)
    });

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

});

export default router;