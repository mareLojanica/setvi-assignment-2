import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "./theme";
import { ModalProvider } from "./providers/ModalProvider";
import { ReportsProvider } from "./providers/ReportsProvider";

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
