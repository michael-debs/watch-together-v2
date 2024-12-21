import LogoutButton from "@/components/shared/Buttons/LogoutButton";
import RequestConnectionButton from "@/components/shared/Buttons/RequestConnectionButton";
import withAuth from "@/components/shared/HOC/withAuth";
import { Box } from "@mui/material";
import React from "react";

function page() {
  return (
    <Box>
      <RequestConnectionButton />
      <LogoutButton />
    </Box>
  );
}

export default withAuth(page);
