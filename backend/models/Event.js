import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: String,

  date: {
    type: Date,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  capacity: {
    type: Number,
    default: 100
  },

  booked: {
    type: Number,
    default: 0
  },

  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
  }

});

export default mongoose.model("Event", eventSchema);
