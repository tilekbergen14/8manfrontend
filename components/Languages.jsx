import React from "react";
import { Button } from "@mui/material";

export default function Languages() {
  return (
    <div style={styles.box}>
      <h3 className="title mx-4">Learn languages</h3>
      <div style={styles.languages}>
        <Button
          style={styles.button}
          variant="contained"
          sx={{ textTransform: "none" }}
          size="small"
        >
          Python
        </Button>
        <Button
          style={styles.button}
          variant="contained"
          sx={{ textTransform: "none" }}
          size="small"
          color="warning"
        >
          JavaScript
        </Button>
        <Button
          style={styles.button}
          variant="contained"
          sx={{ textTransform: "none" }}
          size="small"
          color="error"
        >
          Html
        </Button>
        <Button
          style={styles.button}
          variant="contained"
          sx={{ textTransform: "none" }}
          size="small"
          color="success"
        >
          Css
        </Button>
      </div>
    </div>
  );
}

const styles = {
  box: {
    backgroundColor: "#fff",
    height: "max-content",
    padding: "4px",
    borderRadius: "8px",
  },
  languages: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    margin: "4px",
  },
};
