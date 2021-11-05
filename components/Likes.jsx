import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

export default function Likes({ likewhere, isLiked, setLikes, id }) {
  const [liked, setLiked] = useState(isLiked ? isLiked : false);

  const handleLikes = () => {
    setLiked((liked) => !liked);
    if (liked) {
      setLikes((likes) => likes - 1);
    } else {
      setLikes((likes) => likes + 1);
    }
    const user = JSON.parse(localStorage.getItem("user"));
    user.token &&
      axios
        .post(
          `${process.env.server}/${likewhere}/like`,
          { id },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        )
        .then((result) => {})
        .catch((err) => console.log(err.response ? err.response.data : err));
  };
  return liked ? (
    <FavoriteIcon
      color="danger"
      className="c-pointer"
      fontSize="small"
      sx={{ marginRight: "4px" }}
      onClick={handleLikes}
    />
  ) : (
    <FavoriteBorderIcon
      color="danger"
      className="c-pointer"
      fontSize="small"
      sx={{ marginRight: "4px" }}
      onClick={handleLikes}
    />
  );
}
