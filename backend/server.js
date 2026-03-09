import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import auth from "./routes/auth.js";
import events from "./routes/events.js";
import bookings from "./routes/bookings.js";
import users from "./routes/users.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/events", events);
app.use("/api/bookings", bookings);

app.listen(5000, () => console.log("Server running"));