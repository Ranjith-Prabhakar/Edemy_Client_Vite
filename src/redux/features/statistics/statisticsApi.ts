import { IStatistics } from "../../interfaces/statistics/statistics";
import { apiSlice } from "../api/apiSlice";

export const statisticApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query<IStatistics, void>({
      query: () => ({
        method: "get",
        url: "/admin/statistics",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const  {useGetStatisticsQuery} = statisticApi