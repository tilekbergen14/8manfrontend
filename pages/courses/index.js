import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import styles from "../../styles/Courses.module.css";
import axios from "axios";
import Card from "../../components/Card";
import Search from "../../components/Search";

export default function index({ lessons }) {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Frontend", "Backend"];
  return (
    <div className={`${styles.body} container m-auto`}>
      <div className="p-container">
        <div className="flex space-between align-center py-24">
          <div style={{ maxWidth: "600px", width: "100%" }}>
            <Search margin="8px" />
          </div>
          <TextField
            id="standard-basic"
            label="Category"
            variant="standard"
            name="blockId"
            className="mobile-none"
            select
            value={category}
            sx={{ width: "100px" }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={`${styles.gridView}`}>
          {lessons.map((lesson) => (
            <Card content={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const lessons = await axios.get(`${process.env.server}/lesson/`);

    if (lessons) {
      return {
        props: {
          lessons: lessons.data,
        },
      };
    }
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
