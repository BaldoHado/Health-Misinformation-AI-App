import React, { useState } from "react";
import { Link } from "react-router-dom";

const PromptAI = () => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Here you can do something with the input text, such as sending it to an API or processing it.
    console.log("Submitted text:", inputText);
    setInputText(""); // Clear the input field after submitting
  };

  return (
    <div>
      <h1>Prompt AI</h1>
      <form onSubmit={handleSubmit}>
        <img
          src="../public/images/emma-simpson-mNGaaLeWEp0-unsplash.jpg"
          alt="Image 1"
        />
        <img
          src="../public/images/piron-guillaume-U4FyCp3-KzY-unsplash.jpg"
          alt="Image 2"
        />
        <img
          src="../public/images/sam-moghadam-khamseh-2rrsfMN4hn8-unsplash.jpg"
          alt="Image 3"
        />
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type something..."
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default PromptAI;
