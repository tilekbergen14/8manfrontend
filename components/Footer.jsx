import React from "react";
import whatsapp from "../public/images/whatsapp.svg";
import instagram from "../public/images/instagram.svg";
import gmail from "../public/images/gmail.svg";
import youtube from "../public/images/youtube.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <div style={styles.footer} className="footer">
      <div style={styles.first}>
        <h3 className="logo" style={styles.logo}>
          eightman
        </h3>
        <div style={styles.icons}>
          <Image src={whatsapp} width="24px" height="24px" />
          <Image src={youtube} width="24px" height="24px" />
          <Image src={gmail} width="24px" height="24px" />
          <Image src={instagram} width="24px" height="24px" />
        </div>
        <p style={styles.copyrightText}>Copyright &copy; 2021</p>
      </div>
      <div style={styles.second}>
        <p style={styles.link}>Leave feedback</p>
        <p style={styles.link}>Report bug</p>
      </div>
    </div>
  );
}

const styles = {
  footer: {
    backgroundColor: "#111f4d",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    margin: "0 0 8px 0",
    color: "#fff",
  },
  icons: {
    display: "grid",
    width: "max-content",
    gridGap: "8px",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
  },
  second: {
    color: "#fff",
  },
  link: {
    margin: "0",
    cursor: "pointer",
    fontSize: "14px",
  },
  copyrightText: {
    margin: "8px 0 0 0",
    color: "#fff",
    fontSize: "16px",
  },
};
