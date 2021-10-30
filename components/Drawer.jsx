import * as React from "react";
import { useRouter } from "next/router";
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  List,
  Drawer,
  Box,
  Avatar,
  Button,
} from "@mui/material";

import Link from "next/link";

export default function TemporaryDrawer({ toggleDrawer, left }) {
  let user;
  if (typeof window !== "undefined") {
    let userString = localStorage.getItem("user");
    if (userString) {
      user = JSON.parse(userString);
    }
  }
  const list = () => (
    <Box
      sx={{ width: 500 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        <Link href={user ? "/me" : "/auth"}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar src={user && user.imgUrl} />
            </ListItemIcon>
            <ListItemText primary={user ? user.username : "Log in"} />
          </ListItemButton>
        </Link>
        <Divider />
        <Link href="/">
          <ListItem button key="homepage">
            <ListItemText primary="Homepage" />
          </ListItem>
        </Link>
        <Link href="/posts">
          <ListItem button key="posts">
            <ListItemText primary="Posts" />
          </ListItem>
        </Link>
        <Link href="/questions">
          <ListItem button key="questions">
            <ListItemText primary="Ask Answer" />
          </ListItem>
        </Link>
        <Link href="/aboutus">
          <ListItem button key="aboutus">
            <ListItemText primary="About Us" />
          </ListItem>
        </Link>
        <ListItem button key="aboutus">
          <Button
            variant="contained"
            color={user ? "danger" : "success"}
            onClick={
              user
                ? logout
                : () => {
                    router.push("/auth");
                  }
            }
          >
            {user ? "Log out" : "Sign up"}
          </Button>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
  const router = useRouter();
  const logout = () => {
    localStorage.clear();
    router.reload();
  };
  return (
    <div>
      <Drawer anchor="left" open={left} onClose={() => toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
