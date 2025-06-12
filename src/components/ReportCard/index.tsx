import { Card, Typography, Box, Button, useTheme, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SummarizeIcon from "@mui/icons-material/Summarize";

export interface ReportCardProps {
  id: number;
  title: string;
  content: string;
  onEdit: () => void;
  onSummarize: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  content,
  onEdit,
  onSummarize,
}) => {
  const theme = useTheme();

  return (
    <Paper
      role="article"
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: 2,
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{ fontSize: "1.25rem", mb: 1 }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            "& p": { mb: 1 },
            "& ul": { pl: 3 },
            fontSize: 14,
            color: theme.palette.text.primary,
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            flexWrap: "wrap",
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            aria-label={`Edit ${title}`}
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            startIcon={<SummarizeIcon />}
            aria-label={`Summarize ${title}`}
            onClick={onSummarize}
          >
            Summarize
          </Button>
        </Box>
      </Card>
    </Paper>
  );
};

export default ReportCard;
