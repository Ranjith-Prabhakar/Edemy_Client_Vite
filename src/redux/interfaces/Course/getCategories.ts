export interface ICategory {
  name: string;
  noOfCourses?: number;
  status: "active" | "frozen";
}

export interface IAddCategoriesRes{
          success: boolean,
          message: string,
          data?: ICategory[],
}