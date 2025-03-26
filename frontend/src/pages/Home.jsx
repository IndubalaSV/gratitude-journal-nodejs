import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen flex justify-center">
      <p className="mt-16 text-lg font-bold text-slate-800">
        Welcome, start journaling{" "}
        <span>
          <Link
            to="/journal"
            className="text-secondary underline font-semibold"
          >
            here
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Home;
