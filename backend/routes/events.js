import express from "express";
import Event from "../models/Event.js";
import multer from "multer";

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
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET EVENT BY ID */
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
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
      booked: 0, // เพิ่มตรงนี้
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

    if (event.booked + quantity > event.capacity) {
      return res.status(400).json({ message: "Tickets sold out" });
    }

    event.booked += quantity;

    await event.save();

    res.json(event);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

});

export default router;