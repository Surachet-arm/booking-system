import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

import { connectDB } from "./config/db.js";
import auth from "./routes/auth.js";
import events from "./routes/events.js";
import bookings from "./routes/bookings.js";
import users from "./routes/users.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/events", events);
app.use("/api/bookings", bookings);

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "backend", "uploads"))
);

app.listen(5000, () => console.log("Server running"));