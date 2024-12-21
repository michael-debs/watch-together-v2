"use client";
import { Button } from "@mui/material";
import React, { useState } from "react";
import RequestConnection from "../Modals/RequestConnection";

function RequestConnectionButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Request Connection
      </Button>
      <RequestConnection open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default RequestConnectionButton;
