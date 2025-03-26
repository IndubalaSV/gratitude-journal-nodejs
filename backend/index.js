import express from "express";
import cors from "cors";
import db from "./db.js";
import Entry from "./schema.js";
import admin from "firebase-admin";
import dotenv from "dotenv";

// Initialize dotenv before using env variables
dotenv.config();

const app = express();

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Define CORS options
const corsOptions = {
  origin: "https://gratitude-journal-frontend-theta.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Apply CORS with options
app.use(cors(corsOptions));

db();

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Vercel serverless!" });
});

// Deleting an entry
app.delete("/entry/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Entry.deleteOne({ _id: id });
  res.json(result);
});

// Ensure Firebase Admin SDK is initialized
// Load Firebase service account key
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Fix newline issue
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error(" No token or incorrect format:", authHeader);
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔍 Extracted Token:", token); // Debug: Check if token is extracted correctly

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Token verified successfully:", decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Invalid token:", error.message);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
}

app.post("/api/journal", verifyToken, async (req, res) => {
  try {
    const { title, content, mood } = req.body;
    const userId = req.user.uid; // Get `uid` from Firebase token

    if (!title || !content || !mood) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newEntry = new Entry({
      userId,
      title,
      content,
      mood,
      date: new Date(),
    });
    await newEntry.save();

    res.status(201).json({ message: "Journal entry saved", entry: newEntry });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Fetch user-specific journal entries
app.get("/api/journal", verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const entries = await Entry.find({ userId });

    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Export API handler for Vercel
// export default (req, res) => app(req, res);
export default app;

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
