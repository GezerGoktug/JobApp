import Filter from "./Filter";
import Jobs from "./Jobs";
import { JobItemType } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useJobs from "../context/hooks";

const getJobs = async (): Promise<JobItemType[]> => {
  const response = await fetch("http://localhost:8000/jobs");
  const data = await response.json();
  return data;
};

const JobsWrapper = () => {
  const { setJobs, setInitialJobs } = useJobs();
  const { isPending, error, data } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });
  useEffect(() => {
    if (data) {
      setJobs(data);
      setInitialJobs(data);
    }
  }, [data]);
  return (
    <>
      <Filter />
      {isPending ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Jobs />
      )}
    </>
  );
};

export default JobsWrapper;
