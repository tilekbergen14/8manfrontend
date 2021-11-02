import React from "react";
import axios from "axios";
import styles from "../../styles/Posts.module.css";
import Post from "../../components/Post";
import { Button } from "@mui/material";
import Image from "next/image";
import adbox from "../../public/images/adbox.png";

export default function posts({ posts }) {
  return (
    <div className={styles.postsPage}>
      <div className={styles.first}>
        <h3 className={styles.title}>Learn languages</h3>
        <div className={styles.languages}>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            size="small"
          >
            Python
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            size="small"
            color="warning"
          >
            JavaScript
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            size="small"
            color="error"
          >
            Html
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            size="small"
            color="success"
          >
            Css
          </Button>
        </div>
      </div>
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
      <div className={styles.third}>
        <Image src={adbox} layout="fill" className="b-radius-8" />
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = await axios.get(`${process.env.server}/post`);
  return {
    props: { posts: posts.data ? posts.data : [] },
  };
};
