import { StandardTextFieldProps, TextField } from "@mui/material";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends StandardTextFieldProps {
  name: string;
  label: string;
  errorMessage?: FieldError["message"];
  registration: Partial<UseFormRegisterReturn>;
}

const CustomTextInput: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ name, label, error, errorMessage, registration, ...rest }, ref) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      id={name}
      label={label}
      error={error}
      helperText={errorMessage}
      ref={ref}
      {...registration}
      {...rest}
    />
  );
};

export const TextInput = forwardRef(CustomTextInput);
