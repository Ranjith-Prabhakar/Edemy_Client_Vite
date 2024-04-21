import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TTopTenInstructorAndNoOfCourses } from "../../redux/interfaces/statistics/statistics";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
type Props = {
  topTenInstructorAndNoOfCourses: TTopTenInstructorAndNoOfCourses;
};

const LineChart = ({ topTenInstructorAndNoOfCourses }: Props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Top 10 Insturctors",
      },
    },
  };

  const labels = topTenInstructorAndNoOfCourses.map((elem) => elem.name);

  const data = {
    labels,
    datasets: [
      {
        label: "No Of Courses",
        data: topTenInstructorAndNoOfCourses.map(
          (elem) => elem.numberOfCourses
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
