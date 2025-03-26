//create db
import mongoose from "mongoose";
import Entry from "./schema.js";
import dotenv from "dotenv";
dotenv.config();

async function db() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));
}
export default db;
