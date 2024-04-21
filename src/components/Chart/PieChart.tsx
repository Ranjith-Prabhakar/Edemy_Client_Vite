import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { TTopSellingCategories } from "../../redux/interfaces/statistics/statistics";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  topSellingCategories: TTopSellingCategories;
};

const PieChart = ({ topSellingCategories }: Props) => {
  const names = topSellingCategories.map((value) => value.name);
  const counts = topSellingCategories.map((value) => value.noOfCourses);
  console.log("counts...", counts);
  const data = {
    labels: names,
    datasets: [
      {
        label: "# of courses",
        data: counts,
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
        text: "Leading categories",
      },
    },
  };
  return <Pie options={options} data={data} />;
};

export default PieChart;
