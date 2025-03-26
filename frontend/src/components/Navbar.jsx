import React from "react";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between space-x-4 p-4 text-black text-lg">
      <Link to="/" className="font-bold">
        Home
      </Link>
      <div className="flex justify-center items-center space-x-4">
        <Link to="/journal" className="font-bold">
          Journal
        </Link>
        <Link to="/entries" className="font-bold">
          Entries
        </Link>
        <AuthButton />
      </div>
    </nav>
  );
};

export default Navbar;
