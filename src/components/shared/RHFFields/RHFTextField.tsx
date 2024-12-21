import React from "react";
import { Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

const RHFTextField = ({ name, ...rest }: { name: string } & TextFieldProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    {...rest}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                />
            )}
        />
    );
};

export default RHFTextField;
