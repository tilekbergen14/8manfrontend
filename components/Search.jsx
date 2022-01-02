import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../styles/Home.module.css";

export default function Search({ margin }) {
  return (
    <div className={styles.search}>
      <input
        placeholder="Search..."
        style={{ margin: margin }}
        className={styles.input}
        type="text"
      />
      <SearchIcon color="primary" sx={{ margin: "8px" }} />
    </div>
  );
}
