"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Box } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "@/components/shared/RHFFields/RHFTextField";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/actions/auth";
import { toast } from "react-toastify";

const schema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
});

function Login() {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
    },
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const onSubmit = async ({ username }: { username: string }) => {
    try {
      const response = await login({ username });
      const { status, message } = response;
      if (status === 200) {
        toast.success(message);
        const redirection = searchParams.get("redirect") || "/";
        router.push(redirection);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <RHFTextField name="username" label="Username" />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
}

export default Login;
