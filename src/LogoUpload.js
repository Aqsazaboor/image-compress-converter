import React, { useState } from "react";
import JSZip from "jszip";

const styles = {
  container: {
    padding: "20px",
    borderRadius: "10px",
    color: "black",
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
  const [selectedColor, setSelectedColor] = useState("#000000"); // Initial color: black

  const handleLogoChange = (event) => {
    const files = Array.from(event.target.files);

    const uploadedLogos = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    }));

    setLogos((prevLogos) => [...prevLogos, ...uploadedLogos]);
  };

  const handleReplaceLogo = (index, event) => {
    const file = event.target.files[0];
    const newLogo = {
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    };

    setLogos((prevLogos) => {
      const updatedLogos = [...prevLogos];
      updatedLogos[index] = newLogo;
      return updatedLogos;
    });
  };

  const handleDeleteLogo = (index) => {
    setLogos((prevLogos) => {
      const updatedLogos = [...prevLogos];
      updatedLogos.splice(index, 1);
      return updatedLogos;
    });
  };

  const convertToFormat = (format) => {
    // Logic to convert logos to specified format
    console.log(`Converting to ${format} format...`);
  };

  const downloadZip = () => {
    const zip = new JSZip();

    logos.forEach((logo, index) => {
      zip.file(`logo_${index}.svg`, logo.file);
    });

    zip.generateAsync({ type: "blob" }).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "logos.zip";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
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
        style={{ marginBottom: "10px" }}
      />
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {logos.map((logo, index) => (
          <div key={index} style={styles.logoContainer}>
            <h2>{logo.name}</h2>
            <img
              src={logo.url}
              alt={logo.name}
              style={{ ...styles.logoImage, fill: selectedColor }} // Set fill property for SVG color
            />
            <div style={{ textAlign: "center" }}>
              <input
                type="file"
                accept=".svg"
                onChange={(event) => handleReplaceLogo(index, event)}
                style={{ marginBottom: "10px" }}
              />
              <button
                onClick={() => handleDeleteLogo(index)}
                style={{ ...styles.actionButton, marginBottom: "10px" }}
              >
                Delete
              </button>
              <div>
                <button
                  onClick={() => convertToFormat("JPG")}
                  style={styles.actionButton}
                >
                  JPG
                </button>
                <button
                  onClick={() => convertToFormat("PNG")}
                  style={styles.actionButton}
                >
                  PNG
                </button>
                <button
                  onClick={() => convertToFormat("EPS")}
                  style={styles.actionButton}
                >
                  EPS
                </button>
                <button
                  onClick={() => convertToFormat("AI")}
                  style={styles.actionButton}
                >
                  AI
                </button>
                <button
                  onClick={() => convertToFormat("WebP")}
                  style={styles.actionButton}
                >
                  WebP
                </button>
              </div>
            </div>
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
