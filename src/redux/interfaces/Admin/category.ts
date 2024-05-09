import { ICategory } from "../Course/getCategories";

export interface IFetchCategoriesRes {
  data: {
    data: {
      permitedNext: number;
      data: ICategory[];
    };
    message: string;
    success: string;
  };
}
