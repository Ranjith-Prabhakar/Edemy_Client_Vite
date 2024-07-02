import { useEffect, useState } from "react";
import { useGetStatisticsQuery } from "../../redux/features/statistics/statisticsApi";
import {
  IData,
  IRatingAndNoOfCourses,
  TMonthlySaleAndRevenue,
  TTopSellingCategories,
  TTopTenInstructorAndNoOfCourses,
} from "../../redux/interfaces/statistics/statistics";
import BarChart from "../../components/Chart/BarChart";
import PieChart from "../../components/Chart/PieChart";
import DoughnutChart from "../../components/Chart/DoughnutChart";
import LineChart from "../../components/Chart/LineChart";

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
    <div className="flex justify-center w-full items-center flex-wrap gap-4 p-4 space-y-[40px]">
      {/* 800px:grid 800px:grid-cols-2 800px:gap-4 */}
      <div className=" w-[40%]">
        <BarChart
          chartData={monthlySaleAndRevenue}
          chartName="Monthly Sales And Revenue"
        />
      </div>
      <div className=" w-[40%]">
        <LineChart
          topTenInstructorAndNoOfCourses={topTenInstructorAndNoOfCourses}
        />
      </div>
      <div className=" w-[40%]">
        <DoughnutChart ratingAndNoOfCourses={ratingAndNoOfCourses} />
      </div>
      <div className="w-[40%]">
        <PieChart topSellingCategories={topSellingCategories} />
      </div>
    </div>
  );
};

export default DashBoard;
