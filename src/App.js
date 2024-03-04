// // import React, { useState } from "react";
// // import Compressor from "compressorjs";
// // import "./App.css"; // Import CSS file

// // const ImageProcessor = () => {
// //   const [originalImage, setOriginalImage] = useState(null);
// //   const [compressedImage, setCompressedImage] = useState(null);

// //   const handleFileUpload = (event) => {
// //     const file = event.target.files[0];
// //     setOriginalImage(URL.createObjectURL(file));
// //     new Compressor(file, {
// //       quality: 0.6,
// //       success(result) {
// //         setCompressedImage(URL.createObjectURL(result));
// //       },
// //       error(err) {
// //         console.error("Compression error:", err.message);
// //       },
// //     });
// //   };

// //   const downloadImage = (format) => {
// //     const canvas = document.createElement("canvas");
// //     const ctx = canvas.getContext("2d");
// //     const img = new Image();
// //     img.onload = () => {
// //       canvas.width = img.width;
// //       canvas.height = img.height;
// //       ctx.drawImage(img, 0, 0);
// //       canvas.toBlob((blob) => {
// //         const url = URL.createObjectURL(blob);
// //         const a = document.createElement("a");
// //         a.href = url;
// //         a.download = `image.${format}`;
// //         a.click();
// //         URL.revokeObjectURL(url);
// //       }, `image/${format}`);
// //     };
// //     img.src = compressedImage;
// //   };

// //   return (
// //     <div className="image-processor-container">
// //       <h1>Image Processor</h1>
// //       <input type="file" accept="image/*" onChange={handleFileUpload} />
// //       <div className="image-container">
// //         {originalImage && (
// //           <img src={originalImage} alt="Original" className="original-image" />
// //         )}
// //         {compressedImage && (
// //           <img
// //             src={compressedImage}
// //             alt="Compressed"
// //             className="compressed-image"
// //           />
// //         )}
// //       </div>
// //       {compressedImage && (
// //         <div className="download-buttons">
// //           <button onClick={() => downloadImage("jpg")}>Download as JPG</button>
// //           <button onClick={() => downloadImage("jpeg")}>
// //             Download as JPEG
// //           </button>
// //           <button onClick={() => downloadImage("jfif")}>
// //             Download as JFIF
// //           </button>
// //           <button onClick={() => downloadImage("pjpeg")}>
// //             Download as PJPEG
// //           </button>
// //           <button onClick={() => downloadImage("pjp")}>Download as PJP</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ImageProcessor;
// // import React, { useState } from "react";
// // import Compressor from "compressorjs";

// // function App() {
// //   const [image, setImage] = useState(null);

// //   const handleFileUpload = (event) => {
// //     const file = event.target.files[0];
// //     // Compress the uploaded image
// //     new Compressor(file, {
// //       quality: 0.6,
// //       success(result) {
// //         setImage(result);
// //       },
// //       error(err) {
// //         console.error("Compression error:", err.message);
// //       },
// //     });
// //   };

// //   const handleDownload = () => {
// //     if (!image) return;

// //     // Create a download link
// //     const downloadLink = document.createElement("a");
// //     downloadLink.href = URL.createObjectURL(image);
// //     downloadLink.download = "compressed_image.jpg"; // Change the filename if needed
// //     downloadLink.click();
// //   };

// //   return (
// //     <div>
// //       <h1>Image Upload and Compression</h1>
// //       <input type="file" onChange={handleFileUpload} />
// //       {image && (
// //         <div>
// //           <h2>Compressed Image</h2>
// //           <img src={URL.createObjectURL(image)} alt="Compressed" />
// //           <button onClick={handleDownload}>Download</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useState } from "react";
// import { saveAs } from "file-saver";
// import { SVGConverter } from "react-svgmt";
// import { ChromePicker } from "react-color";
// import JSZip from "jszip";

// const ConverterComponent = () => {
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [color, setColor] = useState("#000000");
//   const [converting, setConverting] = useState(false);
//   const [size, setSize] = useState(100);
//   const [horizontal, setHorizontal] = useState(0);
//   const [vertical, setVertical] = useState(0);

//   const handleFileUpload = (files) => {
//     const svgFile = files[0];
//     setUploadedFile(svgFile);
//   };

//   const handleColorChange = (newColor) => {
//     setColor(newColor.hex);
//   };

//   const convertAndDownload = async () => {
//     if (!uploadedFile) return;

//     setConverting(true);

//     const converter = new SVGConverter();
//     const convertedFiles = await converter.convert({
//       svgFile: uploadedFile,
//       color,
//       size,
//       horizontal,
//       vertical,
//     });

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
//       <h2>Upload SVG and Convert</h2>
//       <input
//         type="file"
//         accept="image/svg+xml"
//         onChange={(e) => handleFileUpload(e.target.files)}
//       />
//       {uploadedFile && (
//         <div
//           style={{
//             marginTop: "20px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div style={{ marginRight: "20px" }}>
//             <h3>Color Variation</h3>
//             <ChromePicker color={color} onChangeComplete={handleColorChange} />
//             <h3>Size</h3>
//             <input
//               type="number"
//               value={size}
//               onChange={(e) => setSize(parseInt(e.target.value))}
//             />
//             <h3>Horizontal Offset</h3>
//             <input
//               type="number"
//               value={horizontal}
//               onChange={(e) => setHorizontal(parseInt(e.target.value))}
//             />
//             <h3>Vertical Offset</h3>
//             <input
//               type="number"
//               value={vertical}
//               onChange={(e) => setVertical(parseInt(e.target.value))}
//             />
//           </div>
//           <div>
//             <h3>Convert and Download</h3>
//             <button onClick={convertAndDownload} disabled={converting}>
//               {converting ? "Converting..." : "Convert & Download"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConverterComponent;

import React, { useState } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const ImageConverter = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [colorVersion, setColorVersion] = useState("Color");

  const handleFileUpload = (files) => {
    const imageFile = files[0];
    setUploadedFile(imageFile);
  };

  const handleColorVersionChange = (version) => {
    setColorVersion(version);
  };

  const convertAndDownload = async () => {
    if (!uploadedFile) return;

    setConverting(true);

    // Simulating conversion for demonstration purposes
    const convertedFiles = {
      jpg: "Converted JPG content",
      png: "Converted PNG content",
      eps: "Converted EPS content",
      ai: "Converted AI content",
      webp: "Converted WebP content",
    };

    // Save converted files
    const zip = new JSZip();
    for (const fileType in convertedFiles) {
      const fileContent = convertedFiles[fileType];
      const fileName = `converted.${fileType.toLowerCase()}`;
      zip.file(fileName, fileContent);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "converted_files.zip");
      setConverting(false);
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Upload Image and Convert</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileUpload(e.target.files)}
      />
      {uploadedFile && (
        <div style={{ marginTop: "20px" }}>
          <h3>Color Version</h3>
          <select
            value={colorVersion}
            onChange={(e) => handleColorVersionChange(e.target.value)}
          >
            <option value="Color">Color</option>
            <option value="Black">Black</option>
            <option value="Invert">Invert</option>
          </select>
          <h3>Convert and Download</h3>
          <button onClick={convertAndDownload} disabled={converting}>
            {converting ? "Converting..." : "Convert & Download"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
