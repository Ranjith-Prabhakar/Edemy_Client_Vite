import { IInstructor } from "../../features/admin/Instructors/instructorsSlice";
export interface IGetInstructorsRes {
  data: {
    permitedNext: number;
    data: IInstructor[];
  };
}
