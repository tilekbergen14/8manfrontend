import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Post({ post }) {
  console.log(post);
  return <div>hello g!</div>;
}

export const getServerSideProps = async (context) => {
  const postId = context.params.post;
  const post = await axios.get(`${process.env.server}/post/${postId}`);
  if (post) {
    return {
      props: {
        post: post.data,
      },
    };
  }
  return {
    notFound: true,
  };
};
