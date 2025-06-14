import React, { type FC } from "react";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useReports } from "../../../context/ReportsContext";
import { useNavigate } from "react-router-dom";
import { REPORT_ROUTES } from "../../../constants/routes";

const ToolbarBar: FC = () => {
  const theme = useTheme();
  const { onFilterChange, filter } = useReports();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  return (
    <Box
      role="search"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        mt: 2,
      }}
    >
      <TextField
        label="Search reports"
        variant="outlined"
        size="small"
        fullWidth={isMobile}
        aria-label="Search reports"
        onChange={(e) => onFilterChange(e.target.value)}
        value={filter}
        sx={{ width: { sm: "35%" } }}
      />

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: isMobile ? "flex-start" : "flex-end",
          width: isMobile ? "100%" : "auto",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          aria-label="Create new report"
          sx={{ width: isMobile ? "100%" : "auto" }}
          onClick={() => navigate(REPORT_ROUTES.CREATE)}
        >
          Create New Report
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          aria-label="Create draft report"
          sx={{ width: isMobile ? "100%" : "auto" }}
          onClick={() => navigate(REPORT_ROUTES.GENERATE_DRAFT)}
        >
          Create Draft
        </Button>
      </Box>
    </Box>
  );
};

export default ToolbarBar;
