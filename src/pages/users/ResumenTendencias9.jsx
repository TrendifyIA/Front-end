import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Link } from "react-router-dom";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const ResumenTendencias9 = () => {
  const [mostrar, setMostrar] = useState(true);
  const [datosPromedio, setDatosPromedio] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resReddit, resRandom] = await Promise.all([
          fetch(
            "http://localhost:8080/social/reddit/trends?topic=Fitness&days=30"
          ),
          fetch(
            "http://localhost:8080/social/random/trends?topic=Fitness&days=30"
          ),
        ]);

        const dataReddit = await resReddit.json();
        const dataRandom = await resRandom.json();

        const promedio = dataReddit.map((item, idx) => {
          const rBuzz = item.avg_buzzscore || 0;
          const randBuzz = dataRandom[idx]?.avg_buzzscore || 0;
          return (rBuzz + randBuzz) / 2;
        });

        setDatosPromedio(promedio);
        setLabels(dataReddit.map((d) => d._id));
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels,
    datasets: mostrar
      ? [
          {
            label: "Fitness",
            data: datosPromedio,
            borderColor: "#3b82f6",
            backgroundColor: "#3b82f6",
            fill: false,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ]
      : [],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="pt-6 px-6 w-full">
      <h1 className="text-3xl font-bold mb-4">
        Análisis general de tendencias
      </h1>

      {/* Gráfica + checkbox */}
      <div className="flex items-start mb-6 w-full">
        <div className="flex-grow bg-white rounded shadow p-6 h-[450px]">
          <Line data={data} options={options} />
        </div>

        <div className="ml-6 flex flex-col gap-3 w-[160px] shrink-0 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={mostrar}
              onChange={() => setMostrar((prev) => !prev)}
            />
            <Link
              to="/users/detalle-tendencia"
              className="font-medium text-sm text-black hover:underline"
            >
              Fitness
            </Link>
          </label>
        </div>
      </div>

      <div>
        <Link to="/users/adminproductos">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Volver a la página de campañas
          </button>
        </Link>
      </div>

      {/* Análisis */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-bold text-lg mb-2">Análisis de tendencias</h2>
        <p>
          Como puedes ver la palabra más relevante durante el mes fue X, seguida
          de Y y Z. Proponemos que pongas especial atención en estas tres para
          promover tu estrategia de marketing ya que puede afectar
          significativamente la campaña.
        </p>
      </div>

      {/* Recomendaciones */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-bold text-lg mb-2">Recomendaciones</h2>
        <p>
          Como recomendación te sugerimos que en tu campaña implementes
          publicidad relacionada con la tendencia Y y que tu producto vea
          relacionado algo con la tendencia X siendo la principal.
        </p>
      </div>
    </div>
  );
};

export default ResumenTendencias9;
