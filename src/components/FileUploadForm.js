// frontend/src/components/FileUploadForm.js
import React, { useState } from "react";
import ConversionOptions from "./ConversionOptions";

function FileUploadForm({ onFileUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      {file && <ConversionOptions />}
    </form>
  );
}

export default FileUploadForm;
