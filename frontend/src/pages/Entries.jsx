import React, { useEffect } from "react";
import useJournalStore from "../store/journalStore";

const Entries = () => {
  let { deleteEntry, fetchEntries, entries } = useJournalStore();
  useEffect(() => {
    fetchEntries();
  }, []);

  const moodColors = {
    happy: "#FFD700",
    grateful: "#FFB6C1",
    excited: "#FF4500",
    calm: "#6B8E23",
    focused: "#4682B4",
    sad: "#778899",
    tired: "#700560",
    inspired: "#FF8C00",
    relaxed: "#20B2AA",
    angry: "#DC143C",
    loved: "#FF1493",
    confident: "#8A2BE2",
  };

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-4 mx-auto p-0 font-mono">
      {entries.map((entry) => {
        const cardBg = moodColors[entry.mood.toLowerCase()] || "#fff";
        return (
          <div
            key={entry._id}
            style={{ backgroundColor: cardBg }}
            className="card shadow-xl p-4 rounded-md text-white"
          >
            <div className="card">
              <h2 className="text-lg mb-4 allura-regular-title">
                {entry.title}
              </h2>
              <p className="allura-regular">{entry.content}</p>
              <p className="mt-4 text-sm">Mood: {entry.mood}</p>
              <p className="text-sm">
                {new Intl.DateTimeFormat("en-GB", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hourCycle: "h23",
                }).format(new Date(entry.createdAt))}
              </p>
            </div>

            <button
              onClick={() => deleteEntry(entry._id)}
              className="cursor-pointer p-2 rounded-md bg-pink-100 text-slate-900 mt-4"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Entries;
