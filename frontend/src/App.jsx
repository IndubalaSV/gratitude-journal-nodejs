import React from "react";
import JournalCard from "./pages/JournalCard";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Entries from "./pages/Entries";
import Home from "./pages/Home";
import useJournalStore from "./store/journalStore";
import useAuthStore from "./store/authStore"; // Import the auth store
import AuthButton from "./components/AuthButton";
import { Navigate } from "react-router-dom";

const App = () => {
  const user = useAuthStore((state) => state.user); // Access the user state
  const login = useAuthStore((state) => state.login); // Access the login function

  React.useEffect(() => {
    useJournalStore.getState().fetchEntries();
  }, []);

  return (
    <div>
      {user ? (
        <div className="w-4/5 mx-auto">
          <Navbar />
          <div className="flex justify-center items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/journal" element={<JournalCard />} />
              <Route path="/entries" element={<Entries />} />
              {/* Add catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center text-lg font-bold text-slate-800">
          <p className="mt-16">
            Welcome, to start journaling sign in / sign up
            <div className="mt-4">
              <AuthButton />
            </div>
          </p>
        </div>
      )}
    </div>
  );
};
export default App;
