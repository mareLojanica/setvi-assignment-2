import React, { useRef, useState, useLayoutEffect, memo } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  useTheme,
  Paper,
  Box,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ExpandMoreIcon from "@mui/icons-material/Visibility";
import type { ReportCardProps } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { REPORT_ROUTES } from "../../../constants/routes";

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  content,
  id,
  isDraft,
}) => {
  const theme = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (el) {
      const hasOverflow = el.scrollHeight > el.clientHeight + 1;
      setIsOverflowing(hasOverflow);
    }
  }, [content]);

  return (
    <Paper
      role="article"
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          <Typography variant="h6">{title}</Typography>
          {isDraft && <Chip label="Draft" color="info" />}
        </Box>

        <CardContent
          ref={contentRef}
          sx={{
            flexGrow: 1,
            height: 300,
            overflowY: "hidden",
            fontSize: 14,
            color: theme.palette.text.primary,
            pr: 1,
            "& p": { mb: 1 },
            "& ul": { pl: 3 },
            WebkitMaskImage: isOverflowing
              ? "linear-gradient(to bottom, black 60%, transparent)"
              : "none",
            maskImage: isOverflowing
              ? "linear-gradient(to bottom, black 60%, transparent)"
              : "none",
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <CardActions
          sx={{
            justifyContent: "flex-end",
            gap: 1,
            mt: "auto",
            flexDirection: "column",
          }}
        >
          <Box sx={{ textAlign: "center", width: "100%" }}>
            {isOverflowing && (
              <Button
                variant="text"
                size="small"
                onPointerDown={(e) => e.preventDefault()}
                startIcon={<ExpandMoreIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(REPORT_ROUTES.SHOW_MORE(id));
                }}
              >
                Show more
              </Button>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mt: isOverflowing ? 2 : 0,
            }}
          >
            <Button
              onPointerDown={(e) => e.preventDefault()}
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(REPORT_ROUTES.DETAIL(id));
              }}
            >
              Edit
            </Button>
            <Button
              onPointerDown={(e) => e.preventDefault()}
              variant="contained"
              startIcon={<SummarizeIcon />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(REPORT_ROUTES.SUMMARIZE_REPORT(id));
              }}
            >
              Summarize
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default memo(ReportCard);
