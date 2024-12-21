"use client";
import RHFTextField from "@/components/shared/RHFFields/RHFTextField";
import { useAuth } from "@/context/AuthContext";
import { usePeerContext } from "@/context/PeerContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import Modal from "./Modal";

function RequestConnection({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (open) {
    return (
      <Modal open={open}>
        <RequestConnectionForm onClose={onClose} />
      </Modal>
    );
  }
}

function RequestConnectionForm({ onClose }: { onClose: () => void }) {
  const { getPeer, requestConnection } = usePeerContext();
  const { user } = useAuth();
  const peer = getPeer();

  const schema = Yup.object({
    peerId: Yup.string()
      .required("Peer ID is required")
      .matches(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
        "Peer ID must be a valid UUID"
      )
      .test(
        "not-same-peerId",
        "You cannot enter your current Peer ID.",
        (value) => value !== peer.id
      ),
  }).required();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      peerId: "",
    },
  });

  const onSubmit = ({ peerId }: { peerId: string }) => {
    requestConnection(peerId);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography variant="h6">
            Hello {user?.username} Your Peer ID: {peer.id || "Loading..."}
          </Typography>
          <RHFTextField name="peerId" label="Peer ID to Connect" />
          <Button type="submit" variant="contained" color="primary">
            Connect
          </Button>
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
}

export default RequestConnection;
