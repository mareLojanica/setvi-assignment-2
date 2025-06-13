import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "./theme";
import App from "./App";
import "normalize.css";
import { ReportsProvider } from "./providers/ReportsProvider";
import { ModalProvider } from "./providers/ModalProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ReportsProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ReportsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
