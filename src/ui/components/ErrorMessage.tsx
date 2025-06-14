import React from "react";
import { Alert } from "@mui/material";

const ErrorMessage = ({ message }: { message: string }) => (
  <Alert severity="error" sx={{ m: 3 }}>
    {message}
  </Alert>
);

export default ErrorMessage;
