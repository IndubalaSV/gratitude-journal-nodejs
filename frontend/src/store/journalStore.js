import { create } from "zustand";
import axios from "axios";
import { getAuth } from "firebase/auth";

async function getToken() {
  const user = getAuth().currentUser;
  if (user) {
    let token = await user.getIdToken();
    console.log(token);
    return token;
  }
  return null;
}

const useJournalStore = create((set, get) => ({
  title: "",
  content: "",
  mood: "",
  entries: [],

  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setMood: (mood) => set({ mood }),

  reset: async () => {
    const { title, content, mood } = get();
    const token = await getToken(); //  Get Firebase token

    if (!token) {
      console.error("User is not authenticated");
      return;
    }
    console.log("sending data to backend", token);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/journal`,
        { title, content, mood },
        { headers: { Authorization: `Bearer ${token}` } } //  Send token
      );

      console.log("Journal entry saved:", response.data);

      get().fetchEntries(); // Refresh entries
      set({ title: "", content: "", mood: "" });
    } catch (error) {
      console.error(
        "Error saving journal entry:",
        error.response?.data || error
      );
    }
  },

  fetchEntries: async () => {
    const token = await getToken();

    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/journal`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      set({ entries: res.data });
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  },

  deleteEntry: async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/entry/${id}`);
    get().fetchEntries(); // refresh after deleting
  },
}));

export default useJournalStore;
