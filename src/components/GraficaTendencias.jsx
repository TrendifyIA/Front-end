/**
 * @file GraficaTendencias.jsx
 * @author Fernanda Ponce
 * @description Componente que muestra una gráfica de líneas con tendencias para los elementos seleccionados.
 */
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
/**
 * GraficaTendencias renderiza un gráfico de líneas que muestra tendencias para los elementos seleccionados.
 *
 * @componente
 * @param {Object} props - Propiedades del componente.
 * @param {number[]} props.seleccionadas - Arreglo de IDs seleccionados para mostrar tendencias.
 * @returns {JSX.Element} Un gráfico de líneas visualizando las tendencias de los elementos seleccionados.
 */
const GraficaTendencias = ({ seleccionadas }) => {
  // Genera datos aleatorios para la gráfica
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
  
  // Configuración de la gráfica
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
