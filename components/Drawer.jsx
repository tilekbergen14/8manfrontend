import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import HomeIcon from "@mui/icons-material/Home";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import InfoIcon from "@mui/icons-material/Info";
import Link from "next/link";

export default function TemporaryDrawer({ toggleDrawer, left }) {
  const list = () => (
    <Box
      sx={{ width: 500 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        <Link href="/">
          <ListItem button key="homepage">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItem>
        </Link>
        <Link href="/posts">
          <ListItem button key="posts">
            <ListItemIcon>
              <MarkunreadMailboxIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItem>
        </Link>
        <Link href="/questions">
          <ListItem button key="questions">
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            <ListItemText primary="Ask Answer" />
          </ListItem>
        </Link>
        <Link href="/aboutus">
          <ListItem button key="aboutus">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Drawer anchor="left" open={left} onClose={() => toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
