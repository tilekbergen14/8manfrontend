import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../styles/Navbar.module.css";
import Drawer from "./Drawer";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";

export default function Navbar({ profileImg }) {
  const [left, setLeft] = React.useState(false);

  const toggleDrawer = (open) => {
    setLeft(open);
  };
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const { data, error } = useSWR(
    `${process.env.server}/user/${user?.id}`,
    async (key) => {
      if (user) {
        return await axios.get(key);
      }
    }
  );
  return (
    <Box sx={{ flexGrow: 1 }} className={styles.stick}>
      <AppBar position="sticky" className={styles.appbar}>
        <Toolbar className={styles.navbar}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginBottom: 1 }}
          >
            <Link href="/">
              <span className={`logo c-pointer`}>eightman</span>
            </Link>
          </Typography>
          <div className="flex">
            <ul className={`${styles.links} flex align-center`}>
              <Link href="/questions">
                <li className={`${styles.link} c-pointer`}>Questions</li>
              </Link>

              <Link href="/posts">
                <li className={`${styles.link} c-pointer`}>Blogs</li>
              </Link>

              <Link href={user ? "/me" : "/auth"}>
                {user ? (
                  <Avatar
                    className="c-pointer"
                    src={data?.data.profile}
                    sx={{ marginLeft: "16px" }}
                  />
                ) : (
                  <Button
                    className={`${styles.link} c-pointer`}
                    variant="outlined"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                  >
                    Login
                  </Button>
                )}
              </Link>
            </ul>
            <IconButton
              onClick={() => toggleDrawer(true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ padding: 0 }}
              className={styles.menu}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer toggleDrawer={toggleDrawer} left={left} user={data?.data} />
    </Box>
  );
}
