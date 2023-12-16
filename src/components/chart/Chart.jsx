import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./Chart.module.scss";
import Card from "../card/Card";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const labels = ["Placed Orders", "Processing", "Shipped", "Delivered"];

const Chart = () => {
  const { orderHistory } = useSelector((store) => store.orders);
  const array = [];
  orderHistory.map((item) => {
    const { orderStatus } = item;
    array.push(orderStatus);
  });

  const getStatusCount = (arr, value) => {
    return arr.filter((item) => item === value).length;
  };

  const [v1, v2, v3, v4] = [
    "Order placed",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  const placed = getStatusCount(array, v1);
  const processing = getStatusCount(array, v2);
  const shipped = getStatusCount(array, v3);
  const delivered = getStatusCount(array, v4);

  const data = {
    labels,
    datasets: [
      {
        label: "Order Count",
        data: [placed, processing, shipped, delivered],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
};

export default Chart;
