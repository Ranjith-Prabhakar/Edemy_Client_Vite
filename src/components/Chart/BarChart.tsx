import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TMonthlySaleAndRevenue } from "../../redux/interfaces/statistics/statistics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  chartName: string;
  chartData: TMonthlySaleAndRevenue;
}

const BarChart = ({ chartName, chartData }: Props) => {
  const monthsRef = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "September",
    "October",
    "November",
    "December",
  ];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: chartName,
      },
    },
  };

  const labels = chartData.map((value) => monthsRef[parseInt(value.month) - 1]);

  const chartValues = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: labels.map((_, index) => chartData[index].revenue),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Sales",
        data: labels.map((_, index) => chartData[index].sale),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={chartValues} />;
};

export default BarChart;
