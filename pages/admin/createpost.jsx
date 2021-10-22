import React, { useRef, useState } from "react";
import MyEditor from "../../components/Editor";
import TextField from "@mui/material/TextField";
import styles from "../../styles/CreatePost.module.css";
import Button from "@mui/material/Button";
import { EditorState } from "draft-js";

export default function createpost(props) {
  const imageInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    title: "",
    tags: "",
    readtime: "",
    imgUrl: "",
    body: EditorState.createEmpty(),
  });

  const handleChange = (e) => {
    if (e.target) {
      setInfo({
        ...info,
        [e.target.name]: e.target.value,
      });
    } else {
      setInfo({ ...info, body: e });
    }
  };

  const createPost = () => {
    setLoading(true);
  };

  return (
    <div className="container-x container-y container">
      <input
        name="imgUrl"
        onChange={handleChange}
        type="file"
        ref={imageInput}
        className="d-none "
      />
      <TextField
        fullWidth
        id="standard-basic"
        label="Title"
        variant="outlined"
        margin="dense"
        name="title"
        onChange={handleChange}
      />
      <div className="flex">
        <div
          onClick={() => {
            imageInput.current?.click();
          }}
          className={`c-pointer ${styles.imgUploadBox} flex justify-center align-center`}
        >
          Choose image
        </div>
        <div style={{ width: "100%", marginLeft: "16px" }}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Tags"
            variant="outlined"
            margin="dense"
            name="tags"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Read time"
            variant="outlined"
            margin="dense"
            name="readtime"
            onChange={handleChange}
          />
        </div>
      </div>
      <MyEditor
        editorState={info.body}
        onEditorChange={handleChange}
        loading={loading}
      />
      <div className="flex space-between">
        <Button
          variant="contained"
          color="danger"
          sx={{ textTransform: "lowercase", marginBottom: "16px" }}
        >
          cancel
        </Button>
        <Button
          onClick={createPost}
          variant="contained"
          color="success"
          sx={{ textTransform: "lowercase", marginBottom: "16px" }}
        >
          Create blog
        </Button>
      </div>
    </div>
  );
}
