import {
  Chart as ChartJs,
  BarElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { OrderInterface } from "../../Types";
import axios from "axios";
import { useQuery } from "react-query";

ChartJs.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const BarChart = () => {
  const { data } = useQuery<OrderInterface[]>({
    queryKey: ["BarChart"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/order/list`)
        .then((res) => res.data),
  });

  const orderCountByMonth = data?.reduce((countByMonth: any, order) => {
    const createdDate = new Date(order.createdDate);
    const month = createdDate.getMonth();
    countByMonth[month] = (countByMonth[month] || 0) + 1;
    return countByMonth;
  }, {});

  const barChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Order Count",
        data: orderCountByMonth
          ? Object.values(orderCountByMonth)
          : Array(12).fill(0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div className="chart-container">
      <div className="chart">
        <h3 style={{ margin: "0px", padding: "0px" }}>Orders per month</h3>
        <Bar data={barChartData} />
      </div>
    </div>
  );
};

export default BarChart;
