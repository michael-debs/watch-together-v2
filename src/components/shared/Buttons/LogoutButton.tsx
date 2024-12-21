"use client"

import { logout } from "@/actions/auth";
import { Button, ButtonProps } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

function LogoutButton(props: ButtonProps) {
  const router = useRouter();

  return (
    <Button
      color="error"
      variant="contained"
      onClick={async () => {
        const response = await logout();
        if (response.status === 200) {
          toast.success(response.message);
          router.push("/login");
        } else {
          toast.error(response.message);
        }
      }}
      {...props}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
