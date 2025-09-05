require('dotenv').config();
const { MongoClient } = require('mongodb');

const sample = [
  // --- Existing Data ---
  {
    name: "Jessica Jane",
    role: "Web Developer",
    bio: "I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web...",
    avatar: "https://i.pravatar.cc/100?img=5",
    tasks: 40, rating: 4.7, reviews: 750, following: false, recent: true
  },
  {
    name: "Abraham Lincoln",
    role: "3D Design",
    bio: "I design 3D assets for Blender and Maya pipelines.",
    avatar: "https://i.pravatar.cc/100?img=12",
    tasks: 32, rating: 4.9, reviews: 510, following: true, recent: true
  },
  {
    name: "Alex Stanton",
    role: "UI / UX Designer",
    bio: "Senior UI/UX at Google. I love crafting accessible interfaces.",
    avatar: "https://i.pravatar.cc/100?img=26",
    tasks: 60, rating: 4.9, reviews: 970, following: false, recent: false
  },
  {
    name: "Antoine Griezmann",
    role: "Android Developer",
    bio: "Android dev with focus on performance and design systems.",
    avatar: "https://i.pravatar.cc/100?img=15",
    tasks: 50, rating: 4.8, reviews: 830, following: false, recent: false
  },

  // --- New Data ---
  {
    name: "Maria Rodriguez",
    role: "Data Scientist",
    bio: "Specializing in machine learning models and data visualization with Python.",
    avatar: "https://i.pravatar.cc/100?img=31",
    tasks: 55, rating: 4.9, reviews: 1200, following: true, recent: true
  },
  {
    name: "David Chen",
    role: "iOS Developer",
    bio: "Swift and SwiftUI expert building beautiful and performant apps for Apple devices.",
    avatar: "https://i.pravatar.cc/100?img=11",
    tasks: 45, rating: 4.8, reviews: 650, following: false, recent: true
  },
  {
    name: "Emily White",
    role: "Project Manager",
    bio: "Agile certified Scrum Master with a knack for keeping complex projects on track.",
    avatar: "https://i.pravatar.cc/100?img=40",
    tasks: 70, rating: 4.9, reviews: 810, following: false, recent: false
  },
  {
    name: "Richard Kyle",
    role: "2D Design",
    bio: "I'm Richard Kyle. I'm a professional 2D Designer at Photoshop company.",
    avatar: "https://i.pravatar.cc/100?img=33",
    tasks: 38, rating: 4.7, reviews: 450, following: false, recent: false
  },
  {
    name: "Anna White",
    role: "3D Design",
    bio: "Hi, I'm Anna White. I'm a professional 3D Designer at Blender company.",
    avatar: "https://i.pravatar.cc/100?img=48",
    tasks: 48, rating: 4.8, reviews: 870, following: true, recent: false
  },
  {
    name: "Julia Philips",
    role: "iOS Developer",
    bio: "Hi, I'm Julia Philips. I'm a senior manager at Apple company.",
    avatar: "https://i.pravatar.cc/100?img=47",
    tasks: 60, rating: 4.9, reviews: 910, following: false, recent: false
  },
  {
    name: "Michael Brown",
    role: "DevOps Engineer",
    bio: "Automating cloud infrastructure with Docker, Kubernetes, and Terraform.",
    avatar: "https://i.pravatar.cc/100?img=52",
    tasks: 65, rating: 4.8, reviews: 950, following: true, recent: false
  },
  {
    name: "Curious George",
    role: "UI/UX Design",
    bio: "Loves to create intuitive user interfaces.",
    avatar: "https://i.pravatar.cc/100?img=18",
    tasks: 28, rating: 4.7, reviews: 250, following: false, recent: true
  }
];

async function seedDB() {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas for seeding");

    const collection = client.db("dnx").collection("mentors");

    await collection.deleteMany({});
    
    await collection.insertMany(sample);

    console.log("✅ Database seeded successfully with 12 mentors");
  } catch(err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await client.close();
    process.exit(0);
  }
}

seedDB();
