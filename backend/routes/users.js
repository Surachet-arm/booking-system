import express from "express";
import User from "../models/User.js";
import protect from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();

router.get("/", protect, admin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

export default router;