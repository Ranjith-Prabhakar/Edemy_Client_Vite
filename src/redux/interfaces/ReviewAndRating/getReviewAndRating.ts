// used in ReviewAndRating component

export interface IGetReviewAndRatingRes {
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
    }[];

}
