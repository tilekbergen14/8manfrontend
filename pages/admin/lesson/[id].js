import React, { useState } from "react";
import styles from "../../../styles/Admin.module.css";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  Divider,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TextField, Button } from "@mui/material";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import MyEditor from "../../../components/Editor";
import Delete from "../../../components/Delete";
import axios from "axios";
import Backdrop from "../../../components/Backdrop";

export default function index({ lesson }) {
  const router = useRouter();
  const [state, setState] = useState({
    navState: "Dashboard",
    piece: {
      title: "",
      position: 1,
      body: EditorState.createEmpty(),
      serieId: null,
      blockTitle: "",
      blockPosition: 1,
      blockId: null,
    },
    loading: false,
    create: "",
    length: lesson.blocks.length,
    loading: false,
  });

  const { data, error } = useSWR("user", async () => {
    try {
      if (typeof window !== "undefined") {
        let user = localStorage.getItem("user");
        if (user) {
          let role = JSON.parse(user).role;
          return role;
        } else {
          router.push("/auth");
        }
      }
    } catch (err) {
      return err.message;
    }
  });

  if (error || data !== "admin")
    return <div>Sorry you don't have permission</div>;
  if (!data) return <div>Loading...</div>;

  const handleChange = (e) => {
    if (e.target) {
      setState({
        ...state,
        piece: { ...state.piece, [e.target.name]: e.target.value },
      });
    } else {
      setState({ ...state, piece: { ...state.piece, body: e } });
    }
  };
  const handlePieceCreate = async () => {
    try {
      setState({ ...state, loading: true });
      const user = JSON.parse(localStorage.getItem("user"));
      const result = await axios.post(
        `${process.env.server}/serie`,
        {
          title: state.piece.title,
          position: state.piece.position,
          body: convertToRaw(state.piece.body.getCurrentContent()),
          blockId: state.piece.blockId,
        },
        {
          headers: {
            authorization: "Bearer " + user.token,
          },
        }
      );
      if (result) {
        router.replace(router.asPath);
        setState({ ...state, loading: false });
      }
    } catch (err) {
      setState({ ...state, loading: false });
      console.log(err);
    }
  };

  const handleBlockCreate = async () => {
    try {
      setState({ ...state, loading: true });
      const user = JSON.parse(localStorage.getItem("user"));
      const result = await axios.post(
        `${process.env.server}/block`,
        {
          lessonId: lesson._id,
          blockTitle: state.piece.blockTitle,
          position: state.piece.blockPosition,
        },
        {
          headers: {
            authorization: "Bearer " + user.token,
          },
        }
      );
      if (result) {
        router.replace(router.asPath);
        setState({ ...state, loading: false });
      }
    } catch (err) {
      console.log(err);
      setState({ ...state, loading: false });
    }
  };
  const handleSerie = (serie, index, block, blockIndex) => {
    setState({
      ...state,
      create: "serie",
      piece: {
        ...state.piece,
        title: serie.title,
        blockId: block._id,
        blockTitle: block.title,
        position: index + 1,
        serieId: serie._id,
        body:
          convertFromRaw(serie.body) &&
          EditorState.createWithContent(convertFromRaw(serie.body)),
      },
    });
  };
  const handleBlock = (block, index) => {
    setState({
      ...state,
      create: "block",
      piece: {
        ...state.piece,
        blockId: block._id,
        blockTitle: block.title,
        blockPosition: index + 1,
      },
    });
  };
  const IconHandle = (block, index) => {
    setState({
      ...state,
      create: "serie",
      piece: {
        ...state.piece,
        title: "",
        blockId: block._id,
        position: block.series.length + 1,
        serieId: null,
        body: EditorState.createEmpty(),
      },
    });
  };
  return (
    <div className={styles.page}>
      <div className={styles.hornav}>
        <div className={styles.fixed}>
          <div className="m-8">
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                setState({
                  ...state,
                  create: "block",
                  piece: {
                    ...state.piece,
                    blockTitle: "",
                    blockPosition: state.length + 1,
                  },
                })
              }
              sx={{ width: "100%" }}
            >
              Add new block
            </Button>
          </div>
          {lesson?.blocks.map((block, blockIndex) => (
            <div key={blockIndex}>
              <ListItemButton
                sx={{
                  padding: "0px 8px",
                  textTransform: "uppercase",
                }}
                className="b-t-1"
              >
                <p
                  onClick={() => handleBlock(block, blockIndex)}
                  className="fw-600 m-0 w-100"
                >{`${block.title}`}</p>
                <ListItemIcon sx={{ margin: 0, minWidth: "auto" }}>
                  <AddCircleIcon
                    sx={{ margin: 0, color: "#406343" }}
                    className="c-pointer"
                    onClick={() => IconHandle(block, index)}
                  />
                </ListItemIcon>
              </ListItemButton>
              {block.series.map(
                (serie, index) =>
                  serie && (
                    <ListItemButton
                      key={index}
                      onClick={() => setState({ ...state, create: "block" })}
                      sx={{ padding: "0px 8px", zIndex: "100" }}
                      onClick={() =>
                        handleSerie(serie, index, block, blockIndex)
                      }
                    >
                      <ListItemText
                        sx={{ textTransform: "capitalize", margin: 0 }}
                        primary={`${serie.title}`}
                      />
                    </ListItemButton>
                  )
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.body}>
        {state.create === "block" ? (
          <form>
            <TextField
              fullWidth
              id="standard-basic"
              label="Title"
              variant="outlined"
              margin="dense"
              name="blockTitle"
              value={state.piece.blockTitle}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              id="standard-basic"
              label="Position"
              variant="outlined"
              margin="dense"
              value={state.piece.blockPosition}
              name="blockPosition"
              onChange={handleChange}
            />
            <div className="flex space-between my-16">
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleBlockCreate}
                type="submit"
              >
                Create
              </Button>
            </div>
            <div className="my-16">
              {state.piece.blockTitle !== "" && (
                <Delete
                  wheredelete="lesson"
                  fullWidth
                  id={state.piece.blockId}
                  additional={`blockId=${state.piece.blockId}`}
                />
              )}
            </div>
          </form>
        ) : state.create === "serie" ? (
          <form>
            <div className="flex">
              <TextField
                required
                fullWidth
                id="standard-basic"
                label="Title"
                variant="outlined"
                margin="dense"
                name="title"
                onChange={handleChange}
                value={state.piece.title}
              />
              <TextField
                fullWidth
                id="standard-basic"
                label="Position"
                variant="outlined"
                margin="dense"
                name="position"
                onChange={handleChange}
                sx={{ width: "20%", marginLeft: 2 }}
                value={state.piece.position}
              />
            </div>
            <div
              style={{
                height: "500px",
                backgroundColor: "#fff",
                margin: "24px 0",
              }}
            >
              <MyEditor
                editorState={state.piece.body}
                onEditorChange={handleChange}
                loading={state.loading}
                height="500px"
              />
            </div>
            <div className="flex space-between">
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handlePieceCreate}
                type="submit"
              >
                Create
              </Button>
            </div>
            <div className="w-100 mt-16">
              <Divider />
              <Typography
                sx={{ margin: "16px 0" }}
                color="text.secondary"
                variant="body2"
              >
                Additional
              </Typography>
              <div className="flex space-between">
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Block"
                  variant="outlined"
                  name="blockId"
                  select
                  value={state.piece.blockId}
                  onChange={handleChange}
                >
                  {lesson?.blocks.map((block) => (
                    <MenuItem key={block._id} value={block._id}>
                      {block.title}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="my-16">
                <Delete
                  wheredelete="block"
                  fullWidth
                  id={state.piece.blockId}
                  additional={`serieId=${state.piece.serieId}`}
                />
              </div>
            </div>
          </form>
        ) : (
          <div>Start editing</div>
        )}
        {state.loading && <Backdrop loading={state.loading} />}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const id = context.params.id;
    const lesson = await axios.get(`${process.env.server}/lesson/${id}`);

    if (lesson) {
      return {
        props: {
          lesson: lesson.data,
        },
      };
    }
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
