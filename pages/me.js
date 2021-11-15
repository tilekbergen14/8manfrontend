import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Me.module.css";
import TextField from "@mui/material/TextField";
import { InputAdornment, Button } from "@mui/material";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import Skeleton from "../components/Skeleton";

export default function me() {
  const imageInput = useRef(null);
  const [base64img, setBase64img] = useState("");
  const [user, setUser] = useState(null);
  const [localUser, setLocalUser] = useState(null);
  const [info, setInfo] = useState("");
  const handleChange = (e) => {
    if (e.target) {
      if (e.target.name === "imgUrl") {
        const img = e.target.files[0];
        const type = e.target.files[0].type;
        if (
          type === "image/jpg" ||
          type === "image/png" ||
          type === "image/jpeg" ||
          type === "image/jfif"
        ) {
          const formData = new FormData();
          formData.append("file", img);
          setInfo({
            ...info,
            [e.target.name]: formData,
          });
          var reader = new FileReader();
          reader.onloadend = function () {
            setBase64img(reader.result);
          };
          reader.readAsDataURL(img);
        }
      } else {
        setInfo({
          ...info,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setInfo({ ...info, body: e });
    }
  };

  useEffect(() => {
    setLocalUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const { data, error } = useSWR(
    `${process.env.server}/user/${localUser?.id}`,
    async (key) => {
      return await axios.get(key);
    }
  );

  return (
    <div className={styles.mepage}>
      <div className={styles.hornav}>
        <p style={{ color: "#000" }} className="c-pointer title">
          About you
        </p>
      </div>
      <div className={styles.content}>
        <p id="aboutyou" className="title" style={{ margin: "0" }}>
          About you
        </p>
        <div className="flex">
          {data ? (
            <div className="flex">
              <div
                onClick={() => {
                  imageInput.current?.click();
                }}
                style={{
                  aspectRatio: "1/1",
                  height: "214px",
                  margin: "16px 8px 0 0",
                }}
                className={`c-pointer imgUploadBox flex justify-center align-center`}
              >
                {base64img !== "" ? (
                  <Image src={base64img} layout="fill" />
                ) : (
                  <p>Profile image</p>
                )}
              </div>
            </div>
          ) : (
            <Skeleton height="200px" aspectRatio="1/1" margin="16px 8px 0 0" />
          )}
          <div style={{ width: "100%" }}>
            {data ? (
              <TextField
                id="standard-basic"
                label="Name"
                variant="standard"
                defaultValue={data.data.username}
                margin="normal"
                fullWidth
                name="username"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                      >
                        Edit
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <Skeleton height="56px" width="100%" />
            )}
            <input
              name="imgUrl"
              onChange={handleChange}
              type="file"
              ref={imageInput}
              className="d-none"
              accept="image/png, .jpeg, .jpg, .jfif"
            />
            {data ? (
              <TextField
                fullWidth
                name="email"
                id="standard-basic"
                label="Email"
                variant="outlined"
                margin="normal"
                defaultValue={data.data.email}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                      >
                        Edit
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <Skeleton height="56px" width="100%" />
            )}
            {data ? (
              <TextField
                id="standard-basic"
                variant="outlined"
                name="password"
                label="Password"
                defaultValue="changepassword"
                margin="normal"
                fullWidth
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                      >
                        Edit
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <Skeleton height="56px" width="100%" />
            )}
          </div>
        </div>
        <div className="flex space-between">
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="success">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
