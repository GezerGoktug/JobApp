import { useContext } from "react";
import { JobContext, JobContextType } from "./JobProvider";
const useJobs = (): JobContextType => {
  const context = useContext(JobContext);
  if (!context) throw new Error("useJobs must be used within a JobsProvider");

  return context;
};

export default useJobs;
