require('dotenv').config(); // Loads variables from .env file
const express = require("express");
const cors = require("cors");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

// The URI will now be loaded from your .env file
const uri = process.env.MONGO_URI; 
const client = new MongoClient(uri);

let db;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    // The database name is specified in the MONGO_URI, but we ensure it here.
    db = client.db("dnx"); 
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

connectDB();

// Middleware to inject DB into routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// API routes
app.use("/api/mentors", require("./routes/mentors"));
app.use("/api/settings", require("./routes/settings"));

// Serve client build in production
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(clientPath));
  app.get("*", (_req, res) =>
    res.sendFile(path.join(clientPath, "index.html"))
  );
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 API running on :${port}`));
