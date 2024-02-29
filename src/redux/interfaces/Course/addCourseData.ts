import { ICourse } from "./generalInterface";

// Response
export interface ICourseResponse {
  status: number;
  message: string;
  data?: ICourse | ICourse[];
}
//request
export interface ICourseDataBody {
  courseName?: string;
  discription?: string;
  tags?: string;
  thumbnail?: string;
  duration?: string;
  moduleNo?: string;
  moduleTittle?: string;
  videoTittle?: string;
  videoNo?: string;
  videoUrl?: string;
}
