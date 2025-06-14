import { Editor } from "@tinymce/tinymce-react";
import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import type { RichTextEditorProps } from "../../types/types";

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = "",
  onChange,
}) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <Box sx={{ position: "relative", minHeight: 300 }}>
      {!isReady && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            zIndex: 1,
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}

      <Editor
        apiKey={import.meta.env.VITE_TINY_MCE_KEYAPI_KEY}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | removeformat | help",
          branding: false,
        }}
        onInit={() => {
          setIsReady(true);
          onChange(initialValue);
        }}
        onEditorChange={(newValue) => {
          onChange?.(newValue);
        }}
        value={initialValue}
      />
    </Box>
  );
};

export default RichTextEditor;
