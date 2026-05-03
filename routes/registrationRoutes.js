const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const Event = require("../models/Event");


//  REGISTER FOR EVENT
router.post("/", async (req, res) => {
  try {
    const { eventId, name, email } = req.body;

    // check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const newRegistration = new Registration({
      eventId,
      name,
      email
    });

    await newRegistration.save();

    res.status(201).json(newRegistration);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//  GET ALL REGISTRATIONS
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().populate("eventId");
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//  GET REGISTRATIONS FOR ONE EVENT
router.get("/event/:eventId", async (req, res) => {
  try {
    const registrations = await Registration.find({
      eventId: req.params.eventId
    });

    res.json(registrations);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;