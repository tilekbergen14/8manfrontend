import styles from "../../styles/Home.module.css";
import Image from "next/image";
import homepage from "../../public/images/homepage.png";
import Search from "../../components/Search";
import Languages from "../../components/Languages";
import Post from "../../components/Post";
import axios from "axios";
import Question from "../../components/Question";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/Link";

export default function SearchResults({ posts, questions }) {
  return (
    <div className={styles.homepage}>
      <div className={`${styles.header} ${styles.spHeader}`}>
        <div className={`${styles.openingText} ${styles.spOpeningText}`}>
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
        <div className={styles.searchBox}>
          <Search />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyRight}>
          <div className="flex space-between align-center">
            <h3 className="title">Posts</h3>
          </div>
          {posts && posts.map((post) => <Post post={post} key={post.id} />)}
          <div className="flex space-between align-center ">
            <h3 className="title">Questions</h3>
          </div>
          {questions &&
            questions.map((question) => (
              <Question key={question.id} question={question} />
            ))}
        </div>
        <div className="mobile-none">
          <Languages />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const posts = await axios.get(`${process.env.server}/post`);
    const questions = await axios.get(`${process.env.server}/question`);
    return {
      props: {
        posts: posts.data ? posts.data : [],
        questions: questions.data ? questions.data : [],
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
