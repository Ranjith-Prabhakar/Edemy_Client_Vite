interface Questions {
  userId: string;
  question: string;
  answers: [
    {
      userId: string;
      answer: string;
      upvote: number;
    }
  ];
}

interface IModule {
  moduleNo: number;
  moduleTittle: string;
  duration: number;
  questions: Questions;
}

interface IReviewRating {
  userId: string;
  review: string;
  rating: number;
}
export interface ICourse {
  courseName: string;
  instructor: string;
  discription: string;
  tags: string[];
  thumbnail: string;
  uplaoadedDate: Date;
  status: "approved" | "pending" | "freez";
  duration: number;
  modules: Array<IModule>;
  review: Array<IReviewRating>;
  rating: number;
  submissionStatus: "work-in-progress" | "completed";
}
// Response
export interface ICourseResponse {
  status: number;
  message: string;
  data?: ICourse | ICourse[];
}
//request
export interface ICourseDataBody {
  courseName: string;
  discription: string;
  tags: string;
  thumbnail: string;
  duration: string;
}


