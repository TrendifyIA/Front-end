import { useState } from "react";
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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const redes = [
  { id: "facebook", nombre: "Facebook", color: "#111827" },
  { id: "instagram", nombre: "Instagram", color: "#3b82f6" },
  { id: "reddit", nombre: "Reddit", color: "#10b981" },
];

const generarDatos = () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

const GraficaRedes = ({ seleccionadas }) => {
  const data = {
    labels: Array.from({ length: 10 }, (_, i) => `Mes ${i}`),
    datasets: redes
      .filter((r) => seleccionadas.includes(r.id))
      .map((r) => ({
        label: r.nombre,
        data: generarDatos(),
        borderColor: r.color,
        backgroundColor: r.color,
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

const ResumenTendencias10 = () => {
  const [seleccionadas, setSeleccionadas] = useState(["instagram", "reddit"]);

  const toggleRed = (id) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="ml-[280px] p-6">
      <h1 className="text-3xl font-bold mb-6">
        Sabritas/ Sabritas de limón / Menos sodio/ Tend1
      </h1>

      <div className="flex justify-between items-start gap-6 mb-6">
        {/* Gráfica */}
        <div className="bg-white rounded shadow p-4 h-[360px] w-[750px]">
          <GraficaRedes seleccionadas={seleccionadas} />
        </div>

        {/* Checkboxes verticales */}
        <div className="flex flex-col gap-4 mt-2 ml-6 pr-10 w-[180px]">
          {redes.map((r) => (
            <label key={r.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={seleccionadas.includes(r.id)}
                onChange={() => toggleRed(r.id)}
              />
              <span className="font-medium text-sm">{r.nombre}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Análisis */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-bold text-lg mb-2">Análisis general de las tendencias</h2>
        <p>
          Como puedes ver en la gráfica tu campaña tiene una mejor recepción en Instagram que en Reddit,
          por lo tanto proponemos que redobles tus esfuerzos en esta plataforma y reanudes una estrategia nueva en Reddit
          para realizar más permeabilidad en el público.
        </p>
      </div>

      {/* Recomendaciones */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-bold text-lg mb-2">Recomendaciones</h2>
        <p>
          Te recomendamos que inviertas un 10% más en publicidad en Instagram y cambies de estrategia en Reddit
          intentando contratar influencers con Karma más alto para llegar a más público.
        </p>
      </div>
    </div>
  );
};

export default ResumenTendencias10;
