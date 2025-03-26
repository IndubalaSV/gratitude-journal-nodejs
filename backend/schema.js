import mongoose from "mongoose";

let EntrySchema = new mongoose.Schema(
  {
    //title content date
    userId: { type: String, required: true, index: true },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    mood: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Entry = mongoose.model("Entry", EntrySchema);
export default Entry;
