// import React, { useState } from "react";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";
// // import canvg from "canvg";

// const styles = {
//   container: {
//     padding: "20px",
//     borderRadius: "10px",
//     color: "white",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   logoContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginBottom: "20px",
//   },
//   logoImage: {
//     maxWidth: "200px",
//     marginBottom: "10px",
//   },
//   input: {
//     marginBottom: "10px",
//   },
//   actionButton: {
//     padding: "5px 10px",
//     backgroundColor: "red",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginRight: "5px",
//   },
// };

// function LogoUpload() {
//   const [logos, setLogos] = useState([]);
//   const [selectedColor, setSelectedColor] = useState("#000000");

//   const handleLogoChange = (event) => {
//     const files = Array.from(event.target.files);
//     console.log(event.target.value);
//     const uploadedLogos = files.map((file) => ({
//       name: file.name,
//       url: URL.createObjectURL(file),
//       file: file,
//     }));

//     setLogos((prevLogos) => [...prevLogos, ...uploadedLogos]);
//   };

//   const handleReplaceLogo = (index, event) => {
//     const file = event.target.files[0];
//     const newLogo = {
//       name: file.name,
//       url: URL.createObjectURL(file),
//       file: file,
//     };

//     setLogos((prevLogos) => {
//       const updatedLogos = [...prevLogos];
//       updatedLogos[index] = newLogo;
//       return updatedLogos;
//     });
//   };

//   const handleDeleteLogo = (index) => {
//     setLogos((prevLogos) => {
//       const updatedLogos = [...prevLogos];
//       updatedLogos.splice(index, 1);
//       return updatedLogos;
//     });
//   };

//   const convertToPNG = (svgUrl, filename) => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     const img = new Image();

//     img.onload = function () {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);

//       canvas.toBlob((blob) => {
//         saveAs(blob, filename + ".png");
//       });
//     };

//     img.src = svgUrl;
//   };

//   const convertToJPG = (svgUrl, filename) => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     const img = new Image();

//     img.onload = function () {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);

//       canvas.toBlob((blob) => {
//         saveAs(blob, filename + ".jpg");
//       }, "image/jpeg");
//     };

//     img.src = svgUrl;
//   };

//   const convertToWebP = (svgUrl, filename) => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     const img = new Image();

//     img.onload = function () {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);

//       canvas.toBlob((blob) => {
//         saveAs(blob, filename + ".webp");
//       }, "image/webp");
//     };

//     img.src = svgUrl;
//   };

//   const convertToEPS = (svgUrl, filename) => {
//     // Implement EPS conversion here
//     // You can use a server-side library or service for this purpose
//     // Example:
//     // fetch("/convert-to-eps", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify({ svgUrl }),
//     // })
//     //   .then((response) => response.blob())
//     //   .then((blob) => {
//     //     saveAs(blob, `${filename}.eps`);
//     //   })
//     //   .catch((error) => {
//     //     console.error("Error converting SVG to EPS:", error);
//     //   });
//   };

//   const convertToAI = (svgUrl, filename) => {
//     // Implement AI conversion here
//     // You can use a server-side library or service for this purpose
//     // Example:
//     // fetch("/convert-to-ai", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify({ svgUrl }),
//     // })
//     //   .then((response) => response.blob())
//     //   .then((blob) => {
//     //     saveAs(blob, `${filename}.ai`);
//     //   })
//     //   .catch((error) => {
//     //     console.error("Error converting SVG to AI:", error);
//     //   });
//   };

//   const downloadZip = () => {
//     const zip = new JSZip();

//     logos.forEach((logo, index) => {
//       const extension = logo.name.split(".").pop().toLowerCase();
//       const filename = `logo_${index}`;

//       if (extension === "svg") {
//         convertToPNG(logo.url, filename);
//         convertToJPG(logo.url, filename);
//         convertToWebP(logo.url, filename);
//         convertToEPS(logo.url, filename);
//         convertToAI(logo.url, filename);
//       } else {
//         zip.file(logo.name, logo.file);
//       }
//     });

//     zip.generateAsync({ type: "blob" }).then((blob) => {
//       saveAs(blob, "logos.zip");
//     });
//   };

//   const setFillColor = (svgDoc, selector) => {
//     const elements = svgDoc.querySelectorAll(selector);
//     elements.forEach((element) => {
//       element.style.fill = selectedColor;
//       element.style.stroke = selectedColor;
//     });
//   };

//   return (
//     <div style={styles.container}>
//       <input
//         type="file"
//         accept=".svg"
//         onChange={handleLogoChange}
//         multiple
//         style={styles.input}
//       />
//       <input
//         type="color"
//         value={selectedColor}
//         onChange={(e) => {
//           setSelectedColor(e.target.value);
//           console.log(e.target.value);
//         }}
//         style={{ marginBottom: "10px" }}
//       />
//       <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
//         {logos.map((logo, index) => (
//           <div key={index} style={styles.logoContainer}>
//             <h2>{logo.name}</h2>
//             <object
//               data={logo.url}
//               type="image/svg+xml"
//               style={{ ...styles.logoImage }}
//               onLoad={(event) => {
//                 const svgDoc = event.target.contentDocument;
//                 console.log(svgDoc);
//                 setFillColor(svgDoc, "path");
//                 setFillColor(svgDoc, "polygon");
//                 setFillColor(svgDoc, "rect");
//               }}
//             >
//               Your browser does not support SVGs
//             </object>
//             <img
//               src={logo.url}
//               alt={logo.name}
//               style={{ ...styles.logoImage, fill: selectedColor }}
//             />
//             <div style={{ textAlign: "center" }}>
//               <input
//                 type="file"
//                 accept=".svg"
//                 onChange={(event) => handleReplaceLogo(index, event)}
//                 style={{ marginBottom: "10px" }}
//               />
//               <button
//                 onClick={() => handleDeleteLogo(index)}
//                 style={{ ...styles.actionButton, marginBottom: "10px" }}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button onClick={downloadZip} style={styles.actionButton}>
//         Download ZIP
//       </button>
//     </div>
//   );
// }

// export default LogoUpload;
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
