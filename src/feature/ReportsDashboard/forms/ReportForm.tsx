import React from "react";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RichTextEditor from "../../../ui/components/RichTextEditor";
import type { ReportFormProps } from "../../../types/types";

// Schema
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  isDraft: z.boolean(),
});

export type ReportFormValues = z.infer<typeof schema>;

const ReportForm: React.FC<ReportFormProps> = ({
  defaultValues = {
    title: "",
    content: "",
    isDraft: false,
  },
  onSubmit,
  submitLabel = "Submit",
  handleClose,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Title"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
        />

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <>
              <RichTextEditor
                initialValue={field.value || ""}
                onChange={field.onChange}
              />
              {errors.content && (
                <Box color="error.main" fontSize={12} mt={0.5}>
                  {errors.content.message}
                </Box>
              )}
            </>
          )}
        />

        <Controller
          name="isDraft"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="Mark as draft"
            />
          )}
        />

        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : submitLabel}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ReportForm;
