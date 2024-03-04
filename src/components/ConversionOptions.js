// frontend/src/components/ConversionOptions.js
import React, { useState } from "react";

function ConversionOptions() {
  const [formats, setFormats] = useState([]);
  const [colorVersion, setColorVersion] = useState("");

  // Handle format selection
  const handleFormatChange = (event) => {
    const { value } = event.target;
    setFormats([...formats, value]);
  };

  // Handle color version selection
  const handleColorVersionChange = (event) => {
    const { value } = event.target;
    setColorVersion(value);
  };

  // Handle submission of conversion options
  const handleSubmit = () => {
    // Send formats and colorVersion to backend for processing
  };

  return (
    <div>
      <h2>Conversion Options</h2>
      <label>Choose Formats:</label>
      <select onChange={handleFormatChange}>
        <option value="JPG">JPG</option>
        <option value="PNG">PNG</option>
        <option value="EPS">EPS</option>
        <option value="AI">AI</option>
        <option value="WebP">WebP</option>
      </select>
      <label>Choose Color Version:</label>
      <select onChange={handleColorVersionChange}>
        <option value="Color">Color</option>
        <option value="Black">Black</option>
        <option value="Invert">Invert</option>
      </select>
      <button onClick={handleSubmit}>Convert</button>
    </div>
  );
}

export default ConversionOptions;
