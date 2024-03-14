export interface IReviewAndRatingReq {
  courseId: string;
  courseName: string;
  fieldToUpdate: string;
  review?: string;
  rating?: number;
}

export interface IReviewAndRatingRes {
    success: boolean;
    message: string;
    data: {
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
    };
}
