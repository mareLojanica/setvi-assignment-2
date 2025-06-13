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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ExpandMoreIcon from "@mui/icons-material/Visibility";
import { useModal } from "../../../context/ModalContext";
import type { ReportCardProps } from "../../../types/types";
import { useSummarizeContent } from "../../../hooks/useOpenApi";

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  content,
  onEdit,
  id,
}) => {
  const theme = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const {
    openShowMoreModal,
    setIsSummaryLoading,
    setModalContent,
    openSummaryModal,
  } = useModal();
  const { mutateAsync: summarize } = useSummarizeContent();
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
        <Box sx={{ display: "flex", flexDirection: "row", padding: 2, gap: 1 }}>
          <Typography variant="h6">{title}</Typography>
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
          <Box
            sx={{
              textAlign: "center",
              width: "100%",
            }}
          >
            {" "}
            {isOverflowing && (
              <Button
                variant="text"
                size="small"
                onPointerDown={(e) => e.preventDefault()}
                startIcon={<ExpandMoreIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  openShowMoreModal({
                    modalTitle: title,
                    content,
                    reportId: id,
                  });
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
                onEdit(title, content, id);
              }}
            >
              Edit
            </Button>
            <Button
              onPointerDown={(e) => e.preventDefault()}
              variant="contained"
              startIcon={<SummarizeIcon />}
              onClick={async (e) => {
                e.stopPropagation();

                const modalTitle = `Summary of report${title}`;

                // Step 1: Open modal with loading state
                openSummaryModal({
                  modalTitle,
                  title: modalTitle,
                  content: "", // initially empty
                  reportId: id,
                });

                setIsSummaryLoading(true);
                setModalContent(""); // optional: reset content

                try {
                  // Step 2: Fetch summary
                  const result = await summarize({ title, content });

                  // Step 3: Update modal with summarized content
                  setModalContent(result.choices[0].message.content);
                } catch (err) {
                  console.error("Failed to summarize", err);
                  setModalContent(
                    "<p style='color:red;'>Failed to summarize report.</p>"
                  );
                } finally {
                  // Step 4: Stop loading
                  setIsSummaryLoading(false);
                }
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
