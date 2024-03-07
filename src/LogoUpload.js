import React, { useState } from "react";
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

  const downloadZip = () => {
    const zip = new JSZip();

    logos.forEach((logo, index) => {
      zip.file(logo.name, logo.file);
    });

    zip.generateAsync({ type: "blob" }).then((blob) => {
      saveAs(blob, "logos.zip");
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
              style={{ ...styles.logoImage, fill: selectedColor }}
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
