import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
export default function Search({ margin, value }) {
  const [keyword, setKeyword] = useState(value ? value : "");
  const router = useRouter();
  const handleSearch = () => {
    router.replace(`/search/${keyword}`);
  };
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

      <SearchIcon
        onClick={handleSearch}
        color="primary"
        sx={{ margin: "8px" }}
        className="c-pointer"
      />
    </div>
  );
}
