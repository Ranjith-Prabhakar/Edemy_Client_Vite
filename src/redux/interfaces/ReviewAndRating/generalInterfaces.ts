
export interface IReviewAndRating {
  _id: string;
  courseId: string;
  courseName: string;
  reviewAndRating: {
    userId: string;
    userName: string;
    date: string;
    review?: string;
    rating?: number;
  }[];
}


