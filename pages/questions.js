import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

export default function posts() {
  return (
    <div>
      <Link href="/add_question">
        <Button variant="contained">Add question</Button>
      </Link>
    </div>
  );
}
