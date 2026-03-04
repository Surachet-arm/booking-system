import mongoose from "mongoose";

export default mongoose.model("Booking", new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  quantity: Number,
  totalPrice: Number
}));