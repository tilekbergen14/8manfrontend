import React, { useState } from "react";
import styles from "../../../styles/Admin.module.css";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ListItem, ListItemText, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TextField, Button } from "@mui/material";
import { convertToRaw, EditorState } from "draft-js";
import MyEditor from "../../../components/Editor";
import Delete from "../../../components/Delete";

export default function index() {
  const router = useRouter();
  const [state, setState] = useState({
    navState: "Dashboard",
    piece: {
      title: "",
      body: EditorState.createEmpty(),
    },
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

  const handleNav = (e) => {
    setState({ ...state, navState: e });
  };

  const handleChange = (e) => {
    if (e.target) {
      setState((state) => ({
        state,
        piece: { ...state.piece, [e.target.name]: e.target.value },
      }));
    } else {
      setState({ ...state, piece: { ...state.piece, body: e } });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.hornav}>
        <div className={styles.fixed}>
          <ListItem
            button
            key="dashboard"
            onClick={() => handleNav("Dashboard")}
            sx={{ padding: "16px 12px 8px 12px", color: "#FD3A69" }}
          >
            <AddCircleIcon sx={{ marginRight: 1 }} />
            Add new block
          </ListItem>
          <ListItem
            button
            key="dashboard"
            onClick={() => handleNav("Dashboard")}
            sx={{ padding: "0px 16px" }}
          >
            <ListItemText primary="Dashboard" />
          </ListItem>
        </div>
      </div>
      <div className={styles.body}>
        <TextField
          fullWidth
          id="standard-basic"
          label="Title"
          variant="outlined"
          margin="dense"
          name="title"
          onChange={handleChange}
        />
        <div
          style={{ height: "500px", backgroundColor: "#fff", margin: "24px 0" }}
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
          <Button variant="contained" color="success">
            Create
          </Button>
        </div>
        <div className="my-16">
          <Delete wheredelete="serie" fullWidth />
        </div>
      </div>
    </div>
  );
}
