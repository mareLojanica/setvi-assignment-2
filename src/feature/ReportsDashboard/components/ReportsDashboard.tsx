import { Typography } from "@mui/material";

import ReportsMainContent from "./ReportsMainContent";
import ToolbarBar from "./Toolbar";

const ReportsDashboard = () => {
  return (
    <>
      <Typography
        variant="h1"
        component="h1"
        sx={{
          mt: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 2, sm: 3 },
          color: "primary.main",
          fontSize: {
            xs: "1.75rem",
            sm: "2.25rem",
            md: "2.75rem",
            lg: "3.25rem",
          },
          lineHeight: 1.2,
          fontWeight: 600,
          wordBreak: "break-word",
          maxWidth: "100%",
          textAlign: "center",
        }}
      >
        Reports Dashboard
      </Typography>
      <ToolbarBar />
      <ReportsMainContent />
    </>
  );
};

export default ReportsDashboard;
