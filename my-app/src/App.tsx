import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { HashRouter, Route, Routes } from "react-router-dom";
import PromptAIPage from "./pages/PromptAIPage";
import Profile from "./pages/ProfilePage";
import Admin from "./pages/AdminPortalPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompt-ai" element={<PromptAIPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
