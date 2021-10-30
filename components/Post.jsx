import React from "react";
import styles from "../styles/Post.module.css";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button } from "@mui/material";

export default function Post({ post }) {
  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <Avatar
          alt="avatar"
          src={post.authorProfile}
          className={styles.avatar}
        />
        <div>
          <p className={styles.name}>{post.author}</p>
          <p className={styles.createdAt}>1 year ago</p>
        </div>
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>{post.title}</h2>
        <div className={styles.tags}>
          {post.tags.map((tag, index) => (
            <Link key={index} href={tag}>
              <p className={styles.tag}>#{tag}</p>
            </Link>
          ))}
        </div>
        <div className={styles.footer}>
          <div className={styles.likes}>
            <FavoriteBorderIcon color="danger" className="c-pointer" />
            <p style={{ marginLeft: "8px" }}>23 likes</p>
          </div>
          <Button
            color="success"
            variant="contained"
            sx={{ textTransform: "lowercase" }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
