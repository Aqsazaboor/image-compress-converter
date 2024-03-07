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
