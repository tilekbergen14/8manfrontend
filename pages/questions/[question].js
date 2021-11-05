import React, { useState, useEffect } from "react";
import styles from "../../styles/Posts.module.css";
import { Button } from "@mui/material";
import Image from "next/image";
import adbox from "../../public/images/adbox.png";
import { stateToHTML } from "draft-js-export-html";
import Prism from "prismjs";
import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Likes from "../../components/Likes";
import MyEditor from "../../components/Editor";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import axios from "axios";
import Backdrop from "../../components/Backdrop";

export default function questions({ question }) {
  const [likes, setLikes] = useState(question.likes);
  const toolbar = ["blockType", "list", "link"];
  const [error, setError] = useState(null);
  const [answerAdded, setAnswerAdded] = useState(null);
  const [loading, setLoading] = useState(false);
  const blockType = ["Normal", "Blockquote", "Code"];
  const [answer, setAnswer] = useState({
    editorState: EditorState.createEmpty(),
  });
  const handleChange = (e) => {
    setAnswer({ editorState: e });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

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
  let body;
  try {
    body = stateToHTML(convertFromRaw(question.body), options);
  } catch (err) {}
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const result = await axios.post(
          `${process.env.server}/answer`,
          {
            body: convertToRaw(answer.editorState.getCurrentContent()),
            question_id: question.id,
          },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        );
        if (result) setAnswerAdded(true);
      }
      if (!user) {
        console.log("please log in");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Something went wrong!");
      console.log(err);
    }
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
                <Avatar variant="rounded" src={question.authorProfile} />
              </ListItemIcon>
              <ListItemText
                sx={{ margin: 0 }}
                primary={question.author}
                secondary={question.createdAt}
              />
            </div>
            <div className="grid grid-center b-r-2">
              <Likes
                likewhere="question"
                setLikes={setLikes}
                id={question.id}
              />
              <p className={styles.likeText}>
                {likes}
                {likes === 0 || likes === 1 ? " Like" : " Likes"}
              </p>
            </div>
          </div>
          <h2 className={`${styles.questionTitle} title`}>{question.title}</h2>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: body }}
          ></div>
        </div>
        {!question.answers ? (
          <h3
            className={styles.questionTitle}
            style={{ margin: "8px 0", color: "#757575" }}
          >
            There is no answers yet!
          </h3>
        ) : (
          <div className="flex space-between">
            <h3
              className={styles.questionTitle}
              style={{ margin: "8px 0", color: "#757575" }}
            >
              {question.answers && question.answers.length} Answers
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
        )}
        {question.answers &&
          question.answers.map(
            (answer) =>
              answer.body !== null && (
                <div className={styles.question} key={answer.id}>
                  <div
                    className={styles.body}
                    dangerouslySetInnerHTML={{
                      __html: stateToHTML(convertFromRaw(answer.body), options),
                    }}
                  ></div>
                  <div className="flex space-between">
                    <div className="flex align-center">
                      <ListItemIcon>
                        <Avatar variant="rounded" />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ margin: 0 }}
                        primary={answer.author}
                        secondary={answer.createdAt}
                      />
                    </div>
                    <div className="grid grid-center b-r-2">
                      <Likes
                        likewhere="answer"
                        setLikes={setLikes}
                        id="fsdfdsf"
                      />
                      <p className={styles.likeText}>{likes} Likes</p>
                    </div>
                  </div>
                </div>
              )
          )}
        <h3
          className={styles.questionTitle}
          style={{ margin: "8px 0 0 0", color: "#757575" }}
        >
          Write your answer
        </h3>
        <div className={styles.editor}>
          <MyEditor
            onEditorChange={handleChange}
            toolbar={toolbar}
            blockType={blockType}
            editorState={answer.editorState}
            wrapper={true}
          />
        </div>
        <div className="flex flex-end">
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            sx={{ marginTop: "8px" }}
          >
            Answer
          </Button>
        </div>
      </div>
      <div className={styles.third}>
        <Image src={adbox} layout="fill" className="b-radius-8" />
      </div>
      {loading && <Backdrop loading={loading} />}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const questionId = context.params.question;
    const question = await axios.get(
      `${process.env.server}/question/${questionId}`
    );
    if (question) {
      return {
        props: {
          question: question.data,
        },
      };
    }
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
