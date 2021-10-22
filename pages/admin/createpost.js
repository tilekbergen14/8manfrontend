import React, { useRef } from "react";
import MyEditor from "../../components/Editor";
import TextField from "@mui/material/TextField";
import styles from "../../styles/CreatePost.module.css";

export default function createpost() {
  const imageInput = useRef(null);
  return (
    <div className="container-x container-y container">
      <input type="file" ref={imageInput} className="d-none " />
      <TextField
        fullWidth
        id="standard-basic"
        label="Title"
        variant="outlined"
        margin="dense"
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
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Read time"
            variant="outlined"
            margin="dense"
            defaultValue="5 min"
          />
        </div>
      </div>
      <MyEditor />
    </div>
  );
}
