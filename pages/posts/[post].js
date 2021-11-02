import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Post.module.css";
import Image from "next/image";
import wave from "../../public/images/wave.svg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import Prism from "prismjs";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";

export default function Post({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const handleLikes = () => {
    setLiked((liked) => !liked);
    if (liked) {
      setLikes((likes) => likes - 1);
    } else {
      setLikes((likes) => likes + 1);
    }
    const user = JSON.parse(localStorage.getItem("user"));
    user.token &&
      axios
        .post(
          `${process.env.server}/post/like`,
          { id: post.id },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        )
        .then((result) => console.log(result))
        .catch((err) => console.log(err.response ? err.response.data : err));
  };
  const date = new Date(post.createdAt);

  let body;
  let options = {
    blockRenderers: {
      code: (block) => {
        return (
          "<pre><code class='language-javascript'>" +
          block.getText() +
          "</pre></code>"
        );
      },
    },
  };
  try {
    body = stateToHTML(convertFromRaw(post.body), options);
  } catch (err) {
    console.log(err);
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  return (
    <div className={styles.postpage}>
      <div className={styles.waveBox}>
        <Image className={styles.wave} src={wave} layout="fill" />
      </div>
      <div className={styles.section}>
        <div className={styles.post}>
          <div className={styles.header}>
            <div className={styles.postInfo}>
              <h1 className={styles.title}>{post.title}</h1>
              <div
                className="flex space-between"
                style={{ marginBottom: "16px" }}
              >
                <p className={`${styles.smallText} ${styles.secondary}`}>
                  {post.author} |{" "}
                  {`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                </p>
              </div>
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <Button
                    key={tag}
                    variant="outlined"
                    color="success"
                    sx={{ margin: "4px" }}
                    fontSize="small"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
            <div className={styles.postImage}>
              <Image
                src={post.imgUrl ? `${process.env.server}/${post.imgUrl}` : "/"}
                layout="fill"
                className={styles.image}
              />
              <div className={styles.likes}>
                {liked ? (
                  <FavoriteIcon
                    color="danger"
                    className="c-pointer"
                    fontSize="small"
                    sx={{ marginRight: "4px" }}
                    onClick={handleLikes}
                  />
                ) : (
                  <FavoriteBorderIcon
                    color="danger"
                    className="c-pointer"
                    fontSize="small"
                    sx={{ marginRight: "4px" }}
                    onClick={handleLikes}
                  />
                )}
                <p className={styles.smallText}>
                  {likes} {likes === 0 || likes === 1 ? "like" : "likes"}
                </p>
              </div>
            </div>
          </div>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: body }}
          ></div>
        </div>

        <div className={styles.additional}></div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const postId = context.params.post;
    const post = await axios.get(`${process.env.server}/post/${postId}`);
    if (post) {
      return {
        props: {
          post: post.data,
        },
      };
    }
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
