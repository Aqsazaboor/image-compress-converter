// import React, { useState } from "react";
// import { saveAs } from "file-saver";
// import JSZip from "jszip";

// const ImageConverter = () => {
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [converting, setConverting] = useState(false);
//   const [colorVersion, setColorVersion] = useState("Color");

//   const handleFileUpload = (files) => {
//     const imageFile = files[0];
//     setUploadedFile(imageFile);
//   };

//   const handleColorVersionChange = (version) => {
//     setColorVersion(version);
//   };

//   const convertAndDownload = async () => {
//     if (!uploadedFile) return;

//     setConverting(true);

//     // Simulating conversion for demonstration purposes
//     const convertedFiles = {
//       jpg: "Converted JPG content",
//       png: "Converted PNG content",
//       eps: "Converted EPS content",
//       ai: "Converted AI content",
//       webp: "Converted WebP content",
//     };

//     // Save converted files
//     const zip = new JSZip();
//     for (const fileType in convertedFiles) {
//       const fileContent = convertedFiles[fileType];
//       const fileName = `converted.${fileType.toLowerCase()}`;
//       zip.file(fileName, fileContent);
//     }

//     zip.generateAsync({ type: "blob" }).then((content) => {
//       saveAs(content, "converted_files.zip");
//       setConverting(false);
//     });
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h2>Upload Image and Convert</h2>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => handleFileUpload(e.target.files)}
//       />
//       {uploadedFile && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Color Version</h3>
//           <select
//             value={colorVersion}
//             onChange={(e) => handleColorVersionChange(e.target.value)}
//           >
//             <option value="Color">Color</option>
//             <option value="Black">Black</option>
//             <option value="Invert">Invert</option>
//           </select>
//           <h3>Convert and Download</h3>
//           <button onClick={convertAndDownload} disabled={converting}>
//             {converting ? "Converting..." : "Convert & Download"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageConverter;
// App.js

import React from "react";
import LogoUpload from "./LogoUpload";

const styles = {
  appContainer: {
    textAlign: "center", // Center-align the content
    backgroundColor: "skyblue",
    color: "white",
    minHeight: "100vh", // Ensure the app fills the entire viewport
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

function App() {
  return (
    <div style={styles.appContainer}>
      <h1>Web Browser App</h1>
      <LogoUpload />
    </div>
  );
}

export default App;
