import Event from "../models/Event.js";
import Booking from "../models/Booking.js";

// GET all events
export const getEvents = async (req, res) => {
  try {

    const events = await Event.find().sort({ date: 1 });

    const eventsWithBooking = await Promise.all(
      events.map(async (event) => {

        const bookings = await Booking.find({ event: event._id });

        const booked = bookings.reduce(
          (sum, b) => sum + b.quantity,
          0
        );

        const remaining = event.capacity - booked;

        return {
          ...event._doc,
          booked,
          remaining
        };

      })
    );

    res.json(eventsWithBooking);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET single event
export const getEventById = async (req, res) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const bookings = await Booking.find({ event: req.params.id });

    const totalBooked = bookings.reduce((sum, b) => sum + b.quantity, 0);

    res.json({
      ...event._doc,
      booked: totalBooked,
      remaining: event.capacity - totalBooked
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// CREATE event
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};