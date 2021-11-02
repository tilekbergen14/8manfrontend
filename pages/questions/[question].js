import React, { useState } from "react";
import styles from "../../styles/Posts.module.css";
import { Button } from "@mui/material";
import Image from "next/image";
import adbox from "../../public/images/adbox.png";
import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Likes from "../../components/Likes";
import MyEditor from "../../components/Editor";
import { Editor, EditorState } from "draft-js";

export default function questions() {
  const [likes, setLikes] = useState(0);
  const toolbar = ["blockType", "list", "link"];
  const blockType = ["Normal", "Blockquote", "Code"];
  const [answer, setAnswer] = useState(EditorState.createEmpty());
  const handleChange = (e) => {
    setAnswer(e);
  };
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
        <h3
          className={styles.questionTitle}
          style={{ margin: "8px 0", color: "#757575" }}
        >
          Question
        </h3>
        <div className={styles.question}>
          <div className="flex space-between">
            <div className="flex align-center">
              <ListItemIcon>
                <Avatar variant="rounded" />
              </ListItemIcon>
              <ListItemText
                sx={{ margin: 0 }}
                primary="This is it"
                secondary="tilekbergene"
              />
            </div>
            <div className="grid grid-center b-r-2">
              <Likes likewhere="question" setLikes={setLikes} id="fsdfdsf" />
              <p className={styles.likeText}>{likes} Likes</p>
            </div>
          </div>
          <h2 className={`${styles.questionTitle} title`}>
            Why isn't this working?
          </h2>
          <div className={styles.body}>This is the body of this question</div>
        </div>
        <div className="flex space-between">
          <h3
            className={styles.questionTitle}
            style={{ margin: "8px 0", color: "#757575" }}
          >
            23 Answers
          </h3>
          <div>
            <Button variant="text" sx={{ textTransform: "none" }}>
              Top
            </Button>
            <Button variant="text" sx={{ textTransform: "none" }}>
              Latest
            </Button>
          </div>
        </div>
        <div className={styles.question}>
          <div className={styles.body}>This is the body of this question</div>
          <div className="flex space-between">
            <div className="flex align-center">
              <ListItemIcon>
                <Avatar variant="rounded" />
              </ListItemIcon>
              <ListItemText
                sx={{ margin: 0 }}
                primary="This is it"
                secondary="tilekbergene"
              />
            </div>
            <div className="grid grid-center b-r-2">
              <Likes likewhere="answer" setLikes={setLikes} id="fsdfdsf" />
              <p className={styles.likeText}>{likes} Likes</p>
            </div>
          </div>
        </div>
        <h3
          className={styles.questionTitle}
          style={{ margin: "8px 0 0 0", color: "#757575" }}
        >
          Write your answer
        </h3>
        <div className={styles.editor}>
          <MyEditor
            editorState={answer}
            wrapper={true}
            toolbar={toolbar}
            blockType={blockType}
            onEditorChange={handleChange}
          />
        </div>
        <div className="flex flex-end">
          <Button variant="contained" color="success">
            Answer
          </Button>
        </div>
      </div>
      <div className={styles.third}>
        <Image src={adbox} layout="fill" className="b-radius-8" />
      </div>
    </div>
  );
}
