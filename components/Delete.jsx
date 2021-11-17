import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

export default function Delete({
  wheredelete,
  questionDelete,
  setDeleted,
  setAnswers,
  id,
  color,
  setAnswerLength,
}) {
  const [verify, setVerify] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      setVerify(false);
      setDeleted(true);
      setAnswerLength && setAnswerLength((answerLength) => answerLength - 1);
      setAnswers &&
        setAnswers((answers) => answers.filter((answer) => answer.id !== id));
      const result = await axios.delete(
        `${process.env.server}/${wheredelete}/${id}`
      );

      if (result && questionDelete) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <span>
      <DeleteIcon
        color="danger"
        sx={{ color: color }}
        className="c-pointer hover"
        onClick={() => setVerify(true)}
      />
      {verify && (
        <div style={styles.box}>
          <div style={styles.modal}>
            Do you really wanna delete this comment!
            <div style={styles.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setVerify(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" color="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}

const styles = {
  box: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: "100vh",
    zIndex: "5",
    display: "grid",
    placeContent: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "8px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "24px",
  },
};
