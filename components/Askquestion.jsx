import React, { useState } from "react";
import styles from "../styles/QuestionModal.module.css";
import { TextField, Button } from "@mui/material";
import MyEditor from "./Editor";
import { EditorState } from "draft-js";
import axios from "axios";
import Snackbar from "./Snackbar";

export default function Askquestion({ setAskquestion, setQuestionCreated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [question, setQuestion] = useState({
    title: "",
    body: EditorState.createEmpty(),
    tags: "",
  });
  const handleChange = (e) => {
    if (e.target) {
      setQuestion({ ...question, [e.target.name]: e.target.value });
    } else {
      setQuestion({ ...question, body: e });
    }
  };
  const toolbar = ["blockType", "list", "link"];
  const blockType = ["Normal", "Blockquote", "Code"];

  const handleSubmit = async () => {
    try {
      setError(null);
      if (question.title === "") return setError("Title is required!");
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const result = await axios.post(
        `${process.env.server}/question`,
        question,
        {
          headers: {
            authorization: "Bearer " + user.token,
          },
        }
      );
      if (result) {
        setLoading(false);
        setAskquestion(false);
        setQuestionCreated(true);
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response
          ? err.response.data
          : "Something went wrong, please try again!"
      );
    }
  };
  return (
    <div className={styles.addquestion}>
      <div className={styles.questionModal}>
        {error && (
          <Snackbar
            open={error && true}
            setError={setError}
            message={error}
            color="error"
          />
        )}
        <h3 className="m-0 title">You are adding question!</h3>
        <p className={styles.info}>Please describe your question clearly!</p>
        <TextField
          fullWidth
          id="standard-basic"
          label="Title"
          variant="outlined"
          margin="dense"
          name="title"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          id="standard-basic"
          label="Tags"
          variant="outlined"
          margin="dense"
          name="tags"
          onChange={handleChange}
        />
        <div className={styles.editor}>
          <MyEditor
            onEditorChange={handleChange}
            toolbar={toolbar}
            blockType={blockType}
            editorState={question.body}
            wrapper={true}
          />
        </div>
        <div className="flex space-between">
          <Button
            color="secondary"
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => setAskquestion(false)}
          >
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Ask"}
          </Button>
        </div>
      </div>
    </div>
  );
}
