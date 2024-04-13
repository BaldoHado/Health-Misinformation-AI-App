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
