import styles from "../styles/Home.module.css";
import Image from "next/image";
import city from "../public/images/city.jpg";
import SearchIcon from "@mui/icons-material/Search";
import Languages from "../components/Languages";
import Post from "../components/Post";
import axios from "axios";
import Question from "../components/Question";

export default function Home({ posts, questions }) {
  return (
    <div className={styles.homepage}>
      <div className={styles.header}>
        <div className={styles.openingText}>
          <h1 className={styles.bigText}>
            <span className={styles.learn}>Learn</span>
            <span className={styles.teach}>Teach</span>
            <span className={styles.explore}>Explore with us!</span>
          </h1>
          <p className={styles.optSmall}>
            We are the comminity of code learners from Kazakhstan! We learn,
            teach and much more. Join the team.
          </p>
        </div>
        <div className={styles.headerImgBox}>
          <Image src={city} layout="fill" className={styles.headerImg} />
        </div>
        <div className={styles.searchBox}>
          <input placeholder="Search..." className={styles.input} type="text" />
          <SearchIcon color="primary" sx={{ margin: "8px" }} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyRight}>
          <h3 className="title m-0">Posts</h3>
          {posts && posts.map((post) => <Post post={post} key={post.id} />)}
          <h3 className="title" style={{ marginBottom: 0 }}>
            Questions
          </h3>
          {questions &&
            questions.map((question) => (
              <Question
                key={question.id}
                question={question}
                question={question}
              />
            ))}
        </div>
        <div className="">
          <Languages />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = await axios.get(`${process.env.server}/post`);
  const questions = await axios.get(`${process.env.server}/question`);
  return {
    props: {
      posts: posts.data ? posts.data : [],
      questions: questions.data ? questions.data : [],
    },
  };
};
