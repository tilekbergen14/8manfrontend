import React, { useState } from "react";
import MyEditor from "../../components/Editor";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { convertToRaw, EditorState } from "draft-js";
import Image from "next/image";
import axios from "axios";
import Backdrop from "../../components/Backdrop";
import Snackbar from "../../components/Snackbar";
import { useRouter } from "next/router";
import ImageUpload from "../../components/ImageUpload";

export default function createpost(props) {
  const [loading, setLoading] = useState(false);
  const [postCreated, setPostCreated] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState({
    title: "",
    tags: "",
    readtime: "",
    imgUrl: "",
    body: EditorState.createEmpty(),
  });
  const router = useRouter();

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
  let user,
    isAdmin = false;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    if (user) {
      let role = JSON.parse(user).role;
      user = JSON.parse(user);
      role === "admin" ? (isAdmin = true) : router.push("/");
    } else {
      router.push("/auth");
    }
  }
  const createPost = async () => {
    try {
      if (info.title === "") return setError("Title is required!");
      setLoading(true);
      let result;
      if (info.imgUrl !== "") {
        const imgresult = await axios.post(
          `${process.env.server}/image`,
          info.imgUrl
        );
        result = await axios.post(
          `${process.env.server}/post`,
          {
            ...info,
            imgUrl: imgresult.data.imageUrl ? imgresult.data.imageUrl : "",
            body: convertToRaw(info.body.getCurrentContent()),
          },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        );
      } else {
        result = await axios.post(
          `${process.env.server}/post`,
          {
            ...info,
            body: convertToRaw(info.body.getCurrentContent()),
          },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        );
      }
      result &&
        setLoading(false) &
          setError(null) &
          setPostCreated(true) &
          setTimeout(() => {
            router.push("/posts/");
          }, 3000);
    } catch (err) {
      setLoading(false);
      setError(
        err.response
          ? err.response.data
          : "Something went wrong, please try again!"
      );
      if (err.response) {
        if (err.response.data === "jwt expired") {
          localStorage.clear();
          router.push("/");
        }
      }
    }
  };

  return (
    <div className="container-x container-y container">
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
        <ImageUpload setImgUrl={setInfo} />
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
      {loading && <Backdrop loading={loading} />}
      {postCreated && (
        <Snackbar
          open={postCreated}
          setPostCreated={setPostCreated}
          message="Post created succesfully!"
          color="success"
        />
      )}
      {error && (
        <Snackbar
          open={error && true}
          setError={setError}
          message={error}
          color="error"
        />
      )}
    </div>
  );
}
