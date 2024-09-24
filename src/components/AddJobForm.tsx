import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { JobItemType } from "../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface JobFormDataType {
  title: string;
  company: string;
  location: string;
  description: string;
  type: string;
  src: string;
  firstDate: Date | null | undefined;
  deadlineDate: Date | null | undefined;
}

const addJob = async (jobData: JobItemType) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  };
  const response = await fetch(
    import.meta.env.VITE_REACT_BASE_URL + "/jobs",
    options
  );
  const data = await response.json();
  return data;
};

const AddJobForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<JobFormDataType>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: () => {
      console.log("Error");
    },
  });

  const onSubmit: SubmitHandler<JobFormDataType> = (data) => {
    const formatDate = (date: Date | null | undefined) =>
      date
        ? date.toLocaleDateString("en-EN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "";

    mutation.mutate({
      ...data,
      firstDate: formatDate(data.firstDate),
      deadlineDate: formatDate(data.deadlineDate),
      application: 0,
    });

    control._reset();
  };
  return (
    <Box
      component="form"
      width="100%"
      boxShadow={4}
      sx={{ backgroundColor: "primary.main", p: { xxs: 2, sm: 4 } }}
      borderRadius={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        display="flex"
        mb={3}
        alignItems="center"
        color="white"
        gap={2}
        component="div"
      >
        <WorkIcon sx={{ fontSize: "30px" }} />
        <Typography fontSize={30} fontWeight={700}>
          Add a new job
        </Typography>
      </Box>
      <Stack spacing={3}>
        <TextField
          {...register("title", { required: "Job Title is required" })}
          color="secondary"
          variant="outlined"
          label="Job Title"
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          {...register("company", { required: "Company is required" })}
          color="secondary"
          variant="outlined"
          label="Company"
          error={!!errors.company}
          helperText={errors.company?.message}
        />
        <TextField
          {...register("src", { required: "Image URL is required" })}
          color="secondary"
          variant="outlined"
          label="Image URL"
          error={!!errors.src}
          helperText={errors.src?.message}
        />
        <TextField
          {...register("description", {
            required: "Job Description is required",
          })}
          color="secondary"
          variant="outlined"
          label="Job Description"
          multiline
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <TextField
          {...register("type", { required: "Job Type is required" })}
          color="secondary"
          variant="outlined"
          label="Job Type"
          select
          defaultValue=""
          error={!!errors.type}
          helperText={errors.type?.message}
        >
          <MenuItem disabled value="">
            Select job type
          </MenuItem>
          <MenuItem value="Remote">Remote</MenuItem>
          <MenuItem value="Hybrid">Hybrid</MenuItem>
          <MenuItem value="Onsite">Onsite</MenuItem>
        </TextField>
        <TextField
          {...register("location", { required: "Location is required" })}
          color="secondary"
          variant="outlined"
          label="Location"
          select
          defaultValue=""
          error={!!errors.location}
          helperText={errors.location?.message}
        >
          <MenuItem disabled value="">
            Select location
          </MenuItem>
          <MenuItem value="Ankara">Ankara</MenuItem>
          <MenuItem value="İstanbul">İstanbul</MenuItem>
          <MenuItem value="New York">New York</MenuItem>
          <MenuItem value="Miami">Miami</MenuItem>
          <MenuItem value="Berlin">Berlin</MenuItem>
        </TextField>
        <Controller
          name="firstDate"
          control={control}
          rules={{ required: "Start Date is required" }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              customInput={
                <TextField
                  color="secondary"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  label="Start Date"
                  error={!!errors.firstDate}
                  helperText={errors.firstDate?.message}
                />
              }
            />
          )}
        />
        <Controller
          name="deadlineDate"
          control={control}
          rules={{ required: "Deadline Date is required" }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              customInput={
                <TextField
                  color="secondary"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  label="Deadline Date"
                  error={!!errors.deadlineDate}
                  helperText={errors.deadlineDate?.message}
                />
              }
            />
          )}
        />
        <Button
          sx={{
            fontWeight: "700",
            fontSize: "20px",
            padding: "10px",
            color: "primary.main",
            backgroundColor: "white",
            "&:hover": {
              color: "white",
            },
          }}
          color="secondary"
          variant="outlined"
          type="submit"
        >
          Add job
        </Button>
      </Stack>
    </Box>
  );
};

export default AddJobForm;
