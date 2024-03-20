export interface ISetVideoReq {
  userId: string;
  courseId: string;
  moduleNo: string;
  moduleTittle: string;
  videoNo: string;
  videoTittle: string;
  position: string;
  complete: "inProgress" | "completed";
}
