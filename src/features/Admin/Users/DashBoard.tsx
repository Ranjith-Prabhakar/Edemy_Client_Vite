import { useEffect, useState } from "react";
import { useGetStatisticsQuery } from "../../../redux/features/statistics/statisticsApi";
import {
  IData,
  IRatingAndNoOfCourses,
  TMonthlySaleAndRevenue,
  TTopSellingCategories,
  TTopTenInstructorAndNoOfCourses,
} from "../../../redux/interfaces/statistics/statistics";
import BarChart from "../../../components/Chart/BarChart";
import PieChart from "../../../components/Chart/PieChart";
import DoughnutChart from "../../../components/Chart/DoughnutChart";
import LineChart from "../../../components/Chart/LineChart";

const DashBoard = () => {
  const { data, isSuccess } = useGetStatisticsQuery();

  const [monthlySaleAndRevenue, setMonthlySaleAndRevenue] =
    useState<TMonthlySaleAndRevenue>([{ month: "", sale: "", revenue: "" }]);

  const [topSellingCategories, setTopSellingCategories] =
    useState<TTopSellingCategories>([{ name: "", noOfCourses: "" }]);
  const [ratingAndNoOfCourses, setRatingAndNoOfCourses] =
    useState<IRatingAndNoOfCourses>([
      {
        count: 0,
        ratingRange_4_5: 0,
        ratingRange_3_4: 0,
        ratingRange_2_3: 0,
        ratingRange_1_2: 0,
        ratingRange_0_1: 0,
      },
    ]);
  const [topTenInstructorAndNoOfCourses, setTopTenInstructorAndNoOfCourses] =
    useState<TTopTenInstructorAndNoOfCourses>([
      { name: "", numberOfCourses: "" },
    ]);

  useEffect(() => {
    if (isSuccess) {
      console.log("data", data.data);
      setMonthlySaleAndRevenue(
        (data.data as IData).monthlySaleAndRevenue as TMonthlySaleAndRevenue
      );
      setTopSellingCategories(
        (data.data as IData).topSellingCategories as TTopSellingCategories
      );
      setRatingAndNoOfCourses(
        (data.data as IData).ratingAndNoOfCourses as IRatingAndNoOfCourses
      );
      setTopTenInstructorAndNoOfCourses(
        (data.data as IData)
          .topTenInstructorAndNoOfCourses as TTopTenInstructorAndNoOfCourses
      );
    }
  }, [isSuccess]);

  return (
    <div className="grid grid-cols-2 gap-4 space-y-10">
      <div>
        <BarChart
          chartData={monthlySaleAndRevenue}
          chartName="Monthly Sales And Revenue"
        />
      </div>
      <div>
        <LineChart
          topTenInstructorAndNoOfCourses={topTenInstructorAndNoOfCourses}
        />
      </div>
      <div>
        <DoughnutChart ratingAndNoOfCourses={ratingAndNoOfCourses} />
      </div>
      <div>
        <PieChart topSellingCategories={topSellingCategories} />
      </div>
    </div>
  );
};

export default DashBoard;
