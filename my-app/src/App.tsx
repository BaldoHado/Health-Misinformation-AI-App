import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { HashRouter, Route, Routes } from "react-router-dom";
import PromptAIPage from "./pages/PromptAIPage";
import SignIn from "./pages/SignInPage";
import Admin from "./pages/AdminPortalPage";
import SignUp from "./pages/SignUpPage";
import ProtectedPage from "./components/ProtectedPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompt-ai" element={<ProtectedPage><PromptAIPage /></ProtectedPage>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin" element={<ProtectedPage><Admin /></ProtectedPage>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
