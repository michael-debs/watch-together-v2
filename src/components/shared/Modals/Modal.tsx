import { Box, ModalProps, Modal as MuiModal } from "@mui/material";
import React from "react";

function Modal(props: ModalProps) {
  const { children, sx } = props;
  return (
    <MuiModal {...props}>
      <Box
        sx={{
            position: "absolute",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 2,
            ...sx
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
}

export default Modal;
