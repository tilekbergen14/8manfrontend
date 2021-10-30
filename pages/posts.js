import React from "react";
import axios from "axios";
import styles from "../styles/Posts.module.css";
import Post from "../components/Post";

export default function posts({ posts }) {
  return (
    <div className={styles.postsPage}>
      <div className={styles.first}></div>
      <div className={styles.second}>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      <div className={styles.third}></div>
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = await axios.get(`${process.env.server}/post`);
  return {
    props: { posts: posts.data },
  };
};
