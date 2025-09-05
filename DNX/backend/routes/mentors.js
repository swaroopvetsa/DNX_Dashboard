const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

// Get recent mentors
router.get("/recent", async (req, res) => {
  try {
    const mentors = await req.db.collection("mentors").find({ recent: true }).toArray();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all mentors
router.get("/", async (req, res) => {
  try {
    const mentors = await req.db.collection("mentors").find().toArray();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// NEW: Follow/unfollow a mentor
router.post("/:id/follow", async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await req.db.collection("mentors").findOne({ _id: new ObjectId(id) });

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    const updatedFollowing = !mentor.following;

    await req.db.collection("mentors").updateOne(
      { _id: new ObjectId(id) },
      { $set: { following: updatedFollowing } }
    );
    
    res.json({ message: `Mentor ${updatedFollowing ? 'followed' : 'unfollowed'} successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;