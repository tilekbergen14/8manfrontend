import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../styles/Home.module.css";
import Link from "next/Link";

export default function Search({ margin }) {
  const [keyword, setKeyword] = useState("");
  return (
    <div className={styles.search}>
      <input
        placeholder="Search..."
        style={{ margin: margin }}
        className={styles.input}
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Link href={`search/${keyword}`}>
        <SearchIcon
          color="primary"
          sx={{ margin: "8px" }}
          className="c-pointer"
        />
      </Link>
    </div>
  );
}
