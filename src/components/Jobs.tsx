import { Stack } from "@mui/material";
import JobItem from "./JobItem";
import useJobs from "../context/hooks";

const Jobs = () => {
  const { jobs } = useJobs();

  return (
    <Stack mt={2} spacing={5}>
      {jobs.map((job, index) => (
        <JobItem key={index} job={job} />
      ))}
    </Stack>
  );
};

export default Jobs;
