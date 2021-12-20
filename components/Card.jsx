import { React, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Image from "next/image";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ post, lesson }) {
  let date;
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handleTag = (e) => {
    e.preventDefault();
    console.log("tag");
  };
  if (lesson) {
    date = new Date(lesson?.createdAt);
    return (
      <Card
        sx={{ maxWidth: "100%", borderRadius: "8px", boxShadow: "none" }}
        className="flex flex-column space-between card"
        onClick={() => lesson.setEditLesson(lesson.index)}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            position: "relative",
            backgroundColor: "#757575",
          }}
          className="flex justify-center align-center"
        >
          {lesson.imgUrl ? (
            <Image
              src={
                lesson.imgUrl ? `${process.env.server}/${lesson.imgUrl}` : "/"
              }
              layout="fill"
            />
          ) : (
            "No image available"
          )}
        </div>

        <CardContent
          className="flex flex-column space-between"
          sx={{ flex: "1", padding: "16px !important" }}
        >
          <Typography
            variant="body2"
            className="ellipsis"
            sx={{ fontWeight: "800", color: "#365acf" }}
          >
            {lesson.title}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  if (post) {
    date = new Date(post?.createdAt);
    const body = post.body && stateToHTML(convertFromRaw(post.body), options);
    return (
      <Card
        sx={{ maxWidth: "100%", borderRadius: "8px", boxShadow: "none" }}
        className="flex flex-column space-between card"
      >
        <Link href={`/posts/${post._id}`}>
          <div
            style={{ width: "100%", aspectRatio: "16/9", position: "relative" }}
          >
            <Image
              src={post.imgUrl ? `${process.env.server}/${post.imgUrl}` : "/"}
              layout="fill"
            />
          </div>
        </Link>
        <CardContent
          className="flex flex-column space-between"
          sx={{ flex: "1" }}
        >
          <Link href={`/posts/${post._id}`}>
            <div>
              <Typography
                variant="h6"
                className="ellipsis"
                sx={{ fontWeight: "800", color: "#365acf" }}
              >
                {post.title}
              </Typography>
              <div
                dangerouslySetInnerHTML={{ __html: body }}
                sx={{ fontSize: "16px", flex: "1" }}
                className="m-a-0 ellipsis mt-16"
              ></div>
            </div>
          </Link>
          <div className="flex space-between mt-16">
            <Typography variant="subtitle2" color="primary">
              {post?.tags.map((tag, index) =>
                post.tags.length - 1 === index ? (
                  <span
                    className="c-pointer hoverblue"
                    onClick={(e) => handleTag(e)}
                  >
                    {tag}
                  </span>
                ) : (
                  <span className="c-pointer hoverblue" onClick={handleTag}>
                    {tag},{" "}
                  </span>
                )
              )}
            </Typography>
            <Typography variant="subtitle2" color="primary">
              {`${
                month[date.getMonth()]
              } ${date.getDay()} , ${date.getFullYear()}`}
            </Typography>
          </div>
        </CardContent>
      </Card>
    );
  }
}

let options = {
  blockRenderers: {
    code: (block) => {
      return (
        "<pre><code class='language-javascript'>" +
        block.getText() +
        "</pre></code>"
      );
    },
  },
};
