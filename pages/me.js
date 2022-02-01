import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Me.module.css";
import TextField from "@mui/material/TextField";
import { InputAdornment, Button } from "@mui/material";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import Skeleton from "../components/Skeleton";
import Snackbar from "../components/Snackbar";
import Backdrop from "../components/Backdrop";
import { useRouter } from "next/router";

export default function me() {
  const imageInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [base64img, setBase64img] = useState("");
  const [updated, setUpdated] = useState(false);
  const [localUser, setLocalUser] = useState(null);
  const [info, setInfo] = useState({});
  const [readOnly, setReadOnly] = useState({
    username: true,
    email: true,
    password: true,
  });
  const router = useRouter();
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    !user && router.push("/auth");
  }
  const handleChange = async (e) => {
    try {
      if (e.target) {
        if (e.target.name === "imgUrl") {
          setLoading(true);

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
            const { data } = await axios.post(
              `${process.env.server}/image`,
              formData
            );

            const result = await axios.put(
              `${process.env.server}/user`,
              {
                profileImg: `${process.env.server}/${data.imageUrl}`,
              },
              {
                headers: {
                  authorization: "Bearer " + localUser?.token,
                },
              }
            );
            if (result) {
              setUpdated(true);
              setLoading(false);
            }
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLocalUser(JSON.parse(localStorage.getItem("user")));
  }, [base64img]);

  const { data, error } = useSWR(
    `${process.env.server}/user/${localUser?.id}`,
    async (key) => {
      return await axios.get(key);
    }
  );
  const handleLogout = () => {
    localStorage.clear();
    router.reload();
  };
  const handleUpdate = async (e) => {
    try {
      if (!readOnly[e]) {
        setLoading(true);
        const result = await axios.put(
          `${process.env.server}/user`,
          { ...info },
          {
            headers: {
              authorization: "Bearer " + localUser?.token,
            },
          }
        );
        if (result) {
          setUpdated(true);
          setLoading(false);
        }
      }
      setReadOnly((readOnly) => {
        return {
          ...readOnly,
          [e]: !readOnly[e],
        };
      });
    } catch (err) {
      setLoading(false);
    }
  };
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
                  border: (data.data.profile || base64img) && "none",
                }}
                className={`c-pointer imgUploadBox flex justify-center align-center`}
              >
                {base64img !== "" || data.data.profile ? (
                  <Image
                    src={base64img ? base64img : data.data.profile}
                    layout="fill"
                  />
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
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  readOnly: readOnly.username,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        variant="contained"
                        color={readOnly.username ? "secondary" : "info"}
                        onClick={() => handleUpdate("username")}
                      >
                        {readOnly.username ? "Edit" : "Save"}
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
                onChange={handleChange}
                defaultValue={data.data.email}
                InputProps={{
                  readOnly: readOnly.email,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        variant="contained"
                        color={readOnly.email ? "secondary" : "info"}
                        onClick={() => handleUpdate("email")}
                      >
                        {readOnly.email ? "Edit" : "Save"}
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
                onChange={handleChange}
                fullWidth
                InputProps={{
                  readOnly: readOnly.password,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        variant="contained"
                        color={readOnly.password ? "secondary" : "info"}
                        onClick={() => handleUpdate("password")}
                      >
                        {readOnly.password ? "Edit" : "Save"}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <Skeleton height="56px" width="100%" />
            )}
          </div>
          {updated && (
            <Snackbar
              open={updated}
              message="Updated successfully!"
              color="success"
              setOpen={setUpdated}
            />
          )}
          {loading && <Backdrop loading={loading} />}
        </div>
        <div className="flex flex-end mt-16">
          <Button
            variant="contained"
            sx={{ widht: "max-content" }}
            color={localUser ? "danger" : "success"}
            onClick={
              localUser
                ? handleLogout
                : () => {
                    router.push("/auth");
                  }
            }
          >
            {localUser ? "Log out" : "Sign up"}
          </Button>
        </div>
      </div>
    </div>
  );
}
