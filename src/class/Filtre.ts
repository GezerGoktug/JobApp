import { JobItemType } from "../types/types";

class Filtre {
  static searchFiltre(jobArr: JobItemType[], search: string): JobItemType[] {
    return jobArr.filter((job) => {
      return (
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  static locationFiltre(
    jobArr: JobItemType[],
    location: string
  ): JobItemType[] {
    return jobArr.filter((job) => job.location === location);
  }

  static sortedFiltre(jobArr: JobItemType[], sort: string): JobItemType[] {
    const sortedJobs = [...jobArr];

    switch (sort) {
      case "titleAZ":
        return sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
      case "applicationCount":
        return sortedJobs.sort((a, b) => {
          const appA = a.application ?? 0;
          const appB = b.application ?? 0;
          return appB - appA;
        });
      case "startDate":
        return sortedJobs.sort(
          (a, b) =>
            new Date(b.firstDate).getTime() - new Date(a.firstDate).getTime()
        );
      default:
        return sortedJobs;
    }
  }
}

export default Filtre;
