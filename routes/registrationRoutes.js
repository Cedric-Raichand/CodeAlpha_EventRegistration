const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

// TEMP route (we’ll build full logic next)
router.get("/", (req, res) => {
  res.send("Registration routes working");
});

module.exports = router;