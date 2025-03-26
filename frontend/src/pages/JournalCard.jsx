import React from "react";
import useJournalStore from "../store/journalStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const JournalCard = () => {
  const { title, content, mood, setTitle, setContent, setMood, reset } =
    useJournalStore();
  const navigate = useNavigate();

  const moods = [
    { label: "Happy 😊", value: "happy" },
    { label: "Sad 😢", value: "sad" },
    { label: "Angry 😡", value: "angry" },
    { label: "Excited 🎉", value: "excited" },
    { label: "Inspired 💡", value: "inspired" },
    { label: "Relaxed 😌", value: "relaxed" },
    { label: "Grateful 🙏", value: "grateful" },
    { label: "Calm 🌿", value: "calm" },
    { label: "Focused 🎯", value: "focused" },
    { label: "Tired 😴", value: "tired" },
    { label: "Loved ❤️", value: "loved" },
    { label: "Confident 💪", value: "confident" },
  ];

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl p-4">
      <div className="card-body">
        <h2 className="text-lg mb-4 text-center">New Journal Entry</h2>
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Content Input */}
        <textarea
          placeholder="Write your thoughts..."
          className="textarea textarea-bordered w-full h-24"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {/* Mood Selection */}
        <select
          className="select select-bordered w-full"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="">Select your mood</option>
          {moods.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        {/* Save Button */}
        <button
          className="btn btn-secondary w-full mt-4"
          onClick={async () => {
            if (!title || !content || !mood) {
              toast.error("Please fill out all fields before saving.");
              return;
            }
            await reset();
            navigate("/entries");
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default JournalCard;
