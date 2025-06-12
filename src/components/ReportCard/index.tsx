import React, {
  useRef,
  useState,
  useLayoutEffect,
  memo,
  type HTMLAttributes,
} from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  useTheme,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ExpandMoreIcon from "@mui/icons-material/Visibility";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useModal } from "../../context/ModalContext";

export interface ReportCardProps {
  id: number;
  title: string;
  content: string;
  onEdit: (title: string, content: string, reportId: number) => void;
  onSummarize: () => void;
  isDragging: boolean;
  dragAttributes?: HTMLAttributes<HTMLElement>;
  dragListeners?: HTMLAttributes<HTMLElement>;
}

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  content,
  onEdit,
  onSummarize,
  isDragging,
  dragAttributes,
  dragListeners,
  id,
}) => {
  const theme = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const { openShowMoreModal } = useModal();

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
        zIndex: isDragging ? 1000 : 1,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: isDragging ? 6 : 1,
          opacity: isDragging ? 0.95 : 1,
          cursor: "default",
        }}
        {...dragAttributes}
      >
        <CardHeader
          title={
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontSize: "1.25rem",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Typography>
          }
          action={
            <span {...dragListeners}>
              <IconButton
                sx={{ cursor: isDragging ? "grabbing" : "grab" }}
                aria-label="Drag handle"
                size="small"
              >
                <DragIndicatorIcon fontSize="small" />
              </IconButton>
            </span>
          }
        />

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
            flexWrap: "wrap",
            gap: 1,
            mt: "auto",
          }}
        >
          {isOverflowing && (
            <Button
              variant="text"
              size="small"
              startIcon={<ExpandMoreIcon />}
              onClick={(e) => {
                e.stopPropagation();
                openShowMoreModal({ modalTitle: title, content, reportId: id });
              }}
            >
              Show more
            </Button>
          )}
          <Button
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
            variant="contained"
            startIcon={<SummarizeIcon />}
            onClick={(e) => {
              e.stopPropagation();
              onSummarize();
            }}
          >
            Summarize
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default memo(ReportCard);
