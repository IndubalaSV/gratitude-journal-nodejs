import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="mx-auto font-mono home min-h-screen pb-4 ">
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </div>
);
