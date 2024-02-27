import React, { useState } from "react";
import Compressor from "compressorjs";
import "./App.css"; // Import CSS file

const ImageProcessor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setOriginalImage(URL.createObjectURL(file));
    new Compressor(file, {
      quality: 0.6,
      success(result) {
        setCompressedImage(URL.createObjectURL(result));
      },
      error(err) {
        console.error("Compression error:", err.message);
      },
    });
  };

  const downloadImage = (format) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `image.${format}`;
        a.click();
        URL.revokeObjectURL(url);
      }, `image/${format}`);
    };
    img.src = compressedImage;
  };

  return (
    <div className="image-processor-container">
      <h1>Image Processor</h1>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      <div className="image-container">
        {originalImage && (
          <img src={originalImage} alt="Original" className="original-image" />
        )}
        {compressedImage && (
          <img
            src={compressedImage}
            alt="Compressed"
            className="compressed-image"
          />
        )}
      </div>
      {compressedImage && (
        <div className="download-buttons">
          <button onClick={() => downloadImage("jpg")}>Download as JPG</button>
          <button onClick={() => downloadImage("jpeg")}>
            Download as JPEG
          </button>
          <button onClick={() => downloadImage("jfif")}>
            Download as JFIF
          </button>
          <button onClick={() => downloadImage("pjpeg")}>
            Download as PJPEG
          </button>
          <button onClick={() => downloadImage("pjp")}>Download as PJP</button>
        </div>
      )}
    </div>
  );
};

export default ImageProcessor;
