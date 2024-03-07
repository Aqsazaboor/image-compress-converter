import React, { useState, useEffect, useRef } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const styles = {
  container: {
    padding: "20px",
    borderRadius: "10px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  logoImage: {
    maxWidth: "200px",
    marginBottom: "10px",
  },
  input: {
    marginBottom: "10px",
  },
  actionButton: {
    padding: "5px 10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "5px",
  },
};

function LogoUpload() {
  const [logos, setLogos] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [colorVersion, setColorVersion] = useState("color");
  const svgRefs = useRef([]);

  const handleLogoChange = (event) => {
    const files = Array.from(event.target.files);
    const uploadedLogos = files.map((file, index) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
      ref: React.createRef(),
    }));

    svgRefs.current = uploadedLogos.map((logo) => logo.ref);
    setLogos(uploadedLogos);
  };

  const handleDeleteLogo = (index) => {
    setLogos((prevLogos) => prevLogos.filter((_, i) => i !== index));
    svgRefs.current = svgRefs.current.filter((_, i) => i !== index);
  };
  useEffect(() => {
    svgRefs.current.forEach((ref) => {
      if (ref.current && ref.current.contentDocument) {
        const svgDoc = ref.current.contentDocument;
        const elements = svgDoc.querySelectorAll("path, polygon, rect");
        elements.forEach((element) => {
          // Apply color changes based on the selected color version
          switch (colorVersion) {
            case "black":
              element.style.fill = "#000000";
              break;
            case "invert":
              break;
            default:
              element.style.fill = selectedColor;
              break;
          }
          element.style.stroke = selectedColor;
        });
      }
    });
  }, [selectedColor, logos, colorVersion]);

  const handleColorVersionChange = (event) => {
    const newColorVersion = event.target.value;
    setColorVersion(newColorVersion);
  };
  const convertToFormat = (svgData, format) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas toBlob failed"));
          }
        }, `image/${format}`);
      };

      img.onerror = reject;
      img.src = url;
    });
  };

  // const downloadZip = async () => {
  //   const zip = new JSZip();

  //   const addToZip = async (blobPromise, name) => {
  //     const blob = await blobPromise;
  //     zip.file(name, blob);
  //   };

  //   for (const [index, logo] of logos.entries()) {
  //     const svgElement = svgRefs.current[index]?.current;
  //     if (svgElement && svgElement.contentDocument) {
  //       const svgData = new XMLSerializer().serializeToString(
  //         svgElement.contentDocument.documentElement
  //       );

  //       const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
  //       zip.file(logo.name, svgBlob);

  //       const pngBlobPromise = convertToFormat(svgData, "png");
  //       await addToZip(pngBlobPromise, logo.name.replace(".svg", ".png"));

  //       const jpegBlobPromise = convertToFormat(svgData, "jpg");
  //       await addToZip(jpegBlobPromise, logo.name.replace(".svg", ".jpg"));
  //     }
  //   }

  //   // Generate the ZIP file
  //   const content = await zip.generateAsync({ type: "blob" });
  //   saveAs(content, "logos.zip");
  // };
  const downloadZip = async () => {
    const zip = new JSZip();

    const addToZip = async (blobPromise, name) => {
      const blob = await blobPromise;
      zip.file(name, blob);
    };

    for (const [index, logo] of logos.entries()) {
      const svgElement = svgRefs.current[index]?.current;
      if (svgElement && svgElement.contentDocument) {
        const svgData = new XMLSerializer().serializeToString(
          svgElement.contentDocument.documentElement
        );

        const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
        zip.file(logo.name, svgBlob);

        // Convert to PNG
        const pngBlobPromise = convertToFormat(svgData, "png");
        await addToZip(pngBlobPromise, logo.name.replace(".svg", ".png"));

        // Convert to JPEG
        const jpegBlobPromise = convertToFormat(svgData, "jpg");
        await addToZip(jpegBlobPromise, logo.name.replace(".svg", ".jpg"));

        // Convert to AI
        const aiBlobPromise = convertToFormat(svgData, "ai");
        await addToZip(aiBlobPromise, logo.name.replace(".svg", ".ai"));

        // Convert to WebP
        const webpBlobPromise = convertToFormat(svgData, "webp");
        await addToZip(webpBlobPromise, logo.name.replace(".svg", ".webp"));
      }
    }

    // Generate the ZIP file
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "logos.zip");
  };

  return (
    <div style={styles.container}>
      <input
        type="file"
        accept=".svg"
        onChange={handleLogoChange}
        multiple
        style={styles.input}
      />
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        style={styles.input}
      />
      <select onChange={handleColorVersionChange} style={styles.input}>
        <option value="color">Color</option>
        <option value="black">Black</option>
        <option value="invert">Invert</option>
      </select>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {logos.map((logo, index) => (
          <div key={index} style={styles.logoContainer}>
            <h2>{logo.name}</h2>
            <object
              data={logo.url}
              type="image/svg+xml"
              ref={logo.ref}
              style={styles.logoImage}
            >
              Your browser does not support SVGs
            </object>
            <button
              onClick={() => handleDeleteLogo(index)}
              style={styles.actionButton}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button onClick={downloadZip} style={styles.actionButton}>
        Download ZIP
      </button>
    </div>
  );
}

export default LogoUpload;
