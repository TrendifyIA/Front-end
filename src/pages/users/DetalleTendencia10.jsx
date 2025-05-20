import React, { useEffect, useState } from "react";
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

const generarDatos = () =>
  Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

const GraficaRedes = ({ seleccionadas, datosReddit }) => {
  const data = {
    labels:
      datosReddit.length > 0
        ? datosReddit.map((d) => d._id)
        : Array.from({ length: 10 }, (_, i) => `Mes ${i}`),
    datasets: redes
      .filter((r) => seleccionadas.includes(r.id))
      .map((r) => {
        const dataPoints =
          r.id === "reddit" && datosReddit.length > 0
            ? datosReddit.map((d) => d.avg_buzzscore)
            : generarDatos();

        return {
          label: r.nombre,
          data: dataPoints,
          borderColor: r.color,
          backgroundColor: r.color,
          fill: false,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        };
      }),
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

  return <Line data={data} options={options} />;
};

const ResumenTendencias10 = () => {
  const [seleccionadas, setSeleccionadas] = useState(["instagram", "reddit"]);
  const [datosReddit, setDatosReddit] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/social/reddit/trends?topic=Fitness&days=30"
        );
        const data = await response.json();
        setDatosReddit(data);
      } catch (error) {
        console.error("Error al obtener datos de Reddit:", error);
      }
    };

    obtenerDatos();
  }, []);

  const toggleRed = (id) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-6 px-6 w-full">
      <h1 className="text-3xl font-bold mb-4">
        Fitness / Tend1
      </h1>

      {/* Contenedor horizontal: gráfica + checkboxes */}
      <div className="flex items-start mb-6 w-full">
        {/* Gráfica expandida completamente */}
        <div className="flex-grow bg-white rounded shadow p-6 h-[450px]">
          <GraficaRedes
            seleccionadas={seleccionadas}
            datosReddit={datosReddit}
          />
        </div>

        {/* Checkboxes alineados verticalmente */}
        <div className="ml-6 flex flex-col gap-3 w-[160px] shrink-0 mt-2">
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
        <h2 className="font-bold text-lg mb-2">
          Análisis general de las tendencias
        </h2>
        <p>
          Como puedes ver en la gráfica, tu campaña tiene una mejor recepción en
          Instagram que en Reddit. Por lo tanto, proponemos que redobles tus
          esfuerzos en esta plataforma y reanudes una estrategia nueva en Reddit
          para lograr más permeabilidad en el público.
        </p>
      </div>

      {/* Recomendaciones */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-bold text-lg mb-2">Recomendaciones</h2>
        <p>
          Te recomendamos que inviertas un 10% más en publicidad en Instagram y
          cambies de estrategia en Reddit, intentando contratar influencers con
          Karma más alto para llegar a más público.
        </p>
      </div>
    </div>
  );
};

export default ResumenTendencias10;
