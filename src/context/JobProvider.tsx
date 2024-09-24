import { createContext, FC, ReactNode, useState } from "react";
import { JobItemType } from "../types/types";

export interface JobContextType {
  jobs: JobItemType[];
  initialJobs: JobItemType[];
  setJobs: (jobs: JobItemType[]) => void;
  setInitialJobs: (jobs: JobItemType[]) => void;
}

export const JobContext = createContext<JobContextType | undefined>(undefined);

interface JobProviderProps {
  children: ReactNode;
}

const JobProvider: FC<JobProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<JobItemType[]>([]);
  const [initialJobs, setInitialJobs] = useState<JobItemType[]>([]);
  const context = {
    jobs,
    setJobs,
    initialJobs,
    setInitialJobs,
  };

  return <JobContext.Provider value={context}>{children}</JobContext.Provider>;
};

export default JobProvider;
