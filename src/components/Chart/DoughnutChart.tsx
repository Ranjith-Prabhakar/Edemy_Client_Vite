import { IRatingAndNoOfCourses } from "../../redux/interfaces/statistics/statistics";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  ratingAndNoOfCourses: IRatingAndNoOfCourses;
};
const DoughnutChart = ({ ratingAndNoOfCourses }: Props) => {
  const data = {
    labels: [
      "Rating : 5",
      "Rating : 4",
      "Rating : 3",
      "Rating : 2",
      "Rating : 1",
    ],
    datasets: [
      {
        label: "No Of Courses",
        data: [
          ratingAndNoOfCourses[0].ratingRange_4_5,
          ratingAndNoOfCourses[0].ratingRange_3_4,
          ratingAndNoOfCourses[0].ratingRange_2_3,
          ratingAndNoOfCourses[0].ratingRange_1_2,
          ratingAndNoOfCourses[0].ratingRange_0_1,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 69, 0, 0.2)",
          "rgba(0, 128, 0, 0.2)",
          "rgba(128, 0, 128, 0.2)",
          "rgba(0, 128, 128, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 0, 0, 1)",
          "rgba(0, 128, 255, 1)",
          "rgba(255, 255, 0, 1)",
          "rgba(0, 255, 128, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Ratings",
      },
    },
  };
  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;
