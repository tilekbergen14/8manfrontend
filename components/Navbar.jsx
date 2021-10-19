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

export default function Navbar() {
  const [left, setLeft] = React.useState(false);

  const toggleDrawer = (open) => {
    setLeft(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            onClick={() => toggleDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginBottom: 1 }}
            className={styles.logo}
          >
            eightman
          </Typography>
          <Link href="/auth">
            <Avatar
              alt="avatar"
              src=""
              sx={{
                width: 24,
                height: 24,
                color: "black",
                bgcolor: "white",
                cursor: "pointer",
              }}
            />
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer toggleDrawer={toggleDrawer} left={left} />
    </Box>
  );
}
