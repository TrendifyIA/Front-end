import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const colores = [
  "#2563eb", "#22c55e", "#9333ea", "#ec4899", "#f97316",
  "#eab308", "#0ea5e9", "#14b8a6", "#f43f5e", "#8b5cf6"
];

const GraficaTendencias = ({ seleccionadas }) => {
  const data = {
    labels: Array.from({ length: 10 }, (_, i) => `Mes ${i}`),
    datasets: seleccionadas.map((id) => ({
      label: `Tendencia ${id}`,
      data: Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 100)
      ),
      borderColor: colores[id - 1],
      backgroundColor: colores[id - 1],
      fill: false,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default GraficaTendencias;
