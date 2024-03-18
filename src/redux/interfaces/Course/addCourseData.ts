import { ICourse } from "./generalInterface";

// Response
export interface ICourseResponse {
  status: number;
  message: string;
  data?: ICourse | ICourse[];
}
//request
export interface ICourseDataBodyReq {
  price?:string;
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

export interface ICourseDataBody {
  // courseName: string;
  // discription: string;
  // tags: string;
  // thumbnail: string;
  // duration: string;
  status: number;
  message: string;
  data: {
    _id:string;
    price: string;
    category:string;
    courseName: string;
    discription: string;
    tags: string;
    thumbnail: string;
    duration: string;
    modules: [
      {
        moduleNo: string;
        moduleTittle: string;
        videos: [
          {
            videoTittle: string;
            videoNo: string;
            videoUrl: string;
          }
        ];
      }
    ];
  };
}
