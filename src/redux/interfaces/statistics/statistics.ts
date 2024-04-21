// export interface IData {
//   monthlySaleAndRevenue?: [{ month: string; sale: string; revenue: string }];
//   topSellingCategories?: [{ name: string; count: string }];
//   ratingAndNoOfCourses?: [{ rating: string; count: string }];
//   topTenInstructorAndNoOfCourses?: [{ name: string; count: string }];
// }

// export interface IStatistics {
//   data: {
//     status: number;
//     message: string;
//     data?: IData;
//   };
// }

export type IRatingAndNoOfCourses =[{
  _id?:string;
  count?: number;
  ratingRange_4_5: number;
  ratingRange_3_4: number;
  ratingRange_2_3: number;
  ratingRange_1_2: number;
  ratingRange_0_1: number;
}]
export type TMonthlySaleAndRevenue = [
  { month: string; sale: string; revenue: string }
];

export type TTopSellingCategories = [{ name: string; noOfCourses: string }];
export type TTopTenInstructorAndNoOfCourses = [
  { name: string; numberOfCourses: string }
];

export interface IData {
  monthlySaleAndRevenue?: TMonthlySaleAndRevenue;
  topSellingCategories?: TTopSellingCategories;
  ratingAndNoOfCourses?: IRatingAndNoOfCourses;
  topTenInstructorAndNoOfCourses?: TTopTenInstructorAndNoOfCourses;
}

export interface IStatistics {
  status: number;
  message: string;
  data?: IData;
}


