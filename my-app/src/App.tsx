import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import PromptAI from "./pages/PromptAIPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompt-ai" element={<PromptAI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
