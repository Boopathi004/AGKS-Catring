// server/index.ts
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import fs from "fs";

var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var rootDir = path.resolve(__dirname, "..");
var dbFile = path.resolve(rootDir, "data", "bookings.json");
fs.mkdirSync(path.dirname(dbFile), { recursive: true });
var adapter = new JSONFileSync(dbFile);
var db = new LowSync(adapter, { bookings: [] });
db.read();

if (!fs.existsSync(dbFile)) {
  db.data = { bookings: [] };
  db.write();
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(cors());
  app.use(express.json());

  app.post("/api/bookings", (req, res) => {
    const { name, email, phone, eventDate, guestCount, message } = req.body;
    if (!name || !email || !eventDate || !guestCount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBooking = {
      name,
      email,
      phone: phone ?? "",
      eventDate,
      guestCount: Number(guestCount),
      message: message ?? "",
      timestamp: new Date().toISOString(),  // ✅ Fixed: removed /* @__PURE__ */ bundler artifact
    };

    db.data.bookings.push(newBooking);
    db.write();
    res.status(201).json({ success: true, booking: newBooking });
  });
}

startServer();
