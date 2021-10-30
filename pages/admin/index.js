import React from "react";
import styles from "../../styles/Admin.module.css";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  let user,
    isAdmin = false;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    if (user) {
      let role = JSON.parse(user).role;
      role === "admin" ? (isAdmin = true) : router.push("/");
    } else {
      router.push("/auth");
    }
  }

  return <div>this is admin page and I like it</div>;
}
