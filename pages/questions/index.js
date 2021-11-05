import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/Posts.module.css";
import Question from "../../components/Question";
import { Button } from "@mui/material";
import Image from "next/image";
import adbox from "../../public/images/adbox.png";
import QuestionModal from "../../components/Askquestion";
import Snackbar from "../../components/Snackbar";

export default function questions({ questions }) {
  const [askquestion, setAskquestion] = useState(false);
  const [questionCreated, setQuestionCreated] = useState(false);
  return (
    <div className={styles.postsPage}>
      {askquestion && (
        <QuestionModal
          setAskquestion={setAskquestion}
          setQuestionCreated={setQuestionCreated}
        />
      )}
      {questionCreated && (
        <Snackbar
          open={questionCreated}
          setPostCreated={setQuestionCreated}
          message="Post created succesfully!"
          color="success"
        />
      )}
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
        <div className="flex space-between">
          <div className="flex">
            <Button variant="text" sx={{ textTransform: "none" }}>
              Latest
            </Button>
            <Button variant="text" sx={{ textTransform: "none" }}>
              Top
            </Button>
          </div>
          <Button
            variant="contained"
            color="success"
            sx={{ textTransform: "none" }}
            onClick={() => setAskquestion(true)}
          >
            Ask Question
          </Button>
        </div>
        {questions.map((question) => (
          <Question key={question.id} question={question} question={question} />
        ))}
      </div>
      <div className={styles.third}>
        <Image src={adbox} layout="fill" className="b-radius-8" />
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  try {
    const questions = await axios.get(`${process.env.server}/question`);
    return {
      props: { questions: questions.data ? questions.data : [] },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
