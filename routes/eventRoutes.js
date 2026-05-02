const express = require("express");
const router = express.Router();
const Event = require("../models/Event");


// 🔥 CREATE EVENT
router.post("/", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔥 GET ALL EVENTS
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔥 GET SINGLE EVENT
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;