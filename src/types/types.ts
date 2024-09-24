export interface JobItemType {
  id?: number;
  title: string;
  company: string;
  location: string;
  description: string;
  type: string;
  firstDate: string;
  deadlineDate: string;
  application?: number;
  src: string;
}
