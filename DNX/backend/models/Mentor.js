const mongoose = require("mongoose");

const MentorSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    bio: String,
    avatar: String,
    tasks: Number,
    rating: Number,
    reviews: Number,
    following: { type: Boolean, default: false },
    recent: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mentor", MentorSchema);
