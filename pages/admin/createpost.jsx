import React, { useRef, useState } from "react";
import MyEditor from "../../components/Editor";
import TextField from "@mui/material/TextField";
import styles from "../../styles/CreatePost.module.css";
import Button from "@mui/material/Button";
import { EditorState } from "draft-js";
import Image from "next/image";
import axios from "axios";
import Backdrop from "../../components/Backdrop";
import Snackbar from "../../components/Snackbar";
import { useRouter } from "next/router";

export default function createpost(props) {
  const imageInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [postCreated, setPostCreated] = useState(false);
  const [base64img, setBase64img] = useState("");
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
      if (e.target.name === "imgUrl") {
        const img = e.target.files[0];
        const type = e.target.files[0].type;
        if (
          type === "image/jpg" ||
          type === "image/png" ||
          type === "image/jpeg" ||
          type === "image/jfif"
        ) {
          const formData = new FormData();
          formData.append("file", img);
          setInfo({
            ...info,
            [e.target.name]: formData,
          });
          var reader = new FileReader();
          reader.onloadend = function () {
            setBase64img(reader.result);
          };
          reader.readAsDataURL(img);
        }
      } else {
        setInfo({
          ...info,
          [e.target.name]: e.target.value,
        });
      }
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
          },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        );
      } else {
        result = await axios.post(`${process.env.server}/post`, info, {
          headers: {
            authorization: "Bearer " + user.token,
          },
        });
      }
      console.log(result);
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
      <input
        name="imgUrl"
        onChange={handleChange}
        type="file"
        ref={imageInput}
        className="d-none"
        accept="image/png, .jpeg, .jpg, .jfif"
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
          {base64img !== "" ? (
            <Image src={base64img} layout="fill" />
          ) : (
            "Choose image"
          )}
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
