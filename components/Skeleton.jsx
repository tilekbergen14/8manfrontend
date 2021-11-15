import React from "react";

export default function Skeleton({
  aspectRatio,
  height,
  width,
  bgColor,
  margin,
}) {
  const styles = {
    height: height,
    backgroundColor: bgColor ? bgColor : "#f2f4f7",
    width: width,
    margin: margin ? margin : "16px 0 8px 0",
    borderRadius: "8px",
    aspectRatio: aspectRatio,
  };
  return <div style={styles}></div>;
}
