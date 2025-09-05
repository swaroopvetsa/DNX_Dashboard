const express = require("express");
const router = express.Router();

// GET settings
router.get("/", async (req, res) => {
  try {
    const settings = await req.db.collection("settings").findOne({});
    res.json(settings || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SAVE/UPDATE settings
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const result = await req.db
      .collection("settings")
      .updateOne({}, { $set: data }, { upsert: true });

    res.json({ message: "Settings saved", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
