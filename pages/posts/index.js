import React from "react";
import axios from "axios";
import styles from "../../styles/Posts.module.css";
import Post from "../../components/Post";
import { Button } from "@mui/material";

export default function posts({ posts }) {
  return (
    <div className={styles.postsPage}>
      <div className={styles.first}></div>
      <div className={styles.second}>
        <div className="flex">
          <Button variant="text" sx={{ textTransform: "none" }}>
            Latest
          </Button>
          <Button variant="text" sx={{ textTransform: "none" }}>
            Top
          </Button>
        </div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <div className={styles.third}></div>
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = await axios.get(`${process.env.server}/post`);
  return {
    props: { posts: posts.data ? posts.data : [] },
  };
};
