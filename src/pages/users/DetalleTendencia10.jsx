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
  { id: "web", nombre: "Web", color: "#111827" },
  { id: "youtube", nombre: "YouTube", color: "#c4302b" },
  { id: "reddit", nombre: "Reddit", color: "#FF5700" },
  // Eliminamos "Random Data" de las opciones gráficas
];

const GraficaRedes = ({ seleccionadas, datosReddit, datosRandom }) => {
  const data = {
    labels:
      datosReddit.length > 0
        ? datosReddit.map((d) => d._id)
        : Array.from({ length: 10 }, (_, i) => `Día ${i + 1}`),
    datasets: redes
      .filter((r) => seleccionadas.includes(r.id))
      .map((r) => {
        let dataPoints = [];
        
        if (r.id === "reddit" && datosReddit.length > 0) {
          dataPoints = datosReddit.map((d) => d.avg_buzzscore);
        } else if (r.id === "web" && datosRandom.length > 0) {
          // Usamos EXCLUSIVAMENTE los datos random para "web"
          dataPoints = datosRandom.map((d) => d.avg_buzzscore);
        } else if (r.id === "youtube") {
          // Datos simulados para YouTube
          dataPoints = datosRandom.length > 0 
            ? datosRandom.map((d) => d.avg_buzzscore * 1.2) // 20% más alto que web
            : Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
        }

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
        max: 100,
      },
    },
  };

  return <Line data={data} options={options} />;
};

const ResumenTendencias10 = () => {
  const [seleccionadas, setSeleccionadas] = useState(["web", "reddit"]);
  const [datosReddit, setDatosReddit] = useState([]);
  const [datosRandom, setDatosRandom] = useState([]);


  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Obtenemos datos de Reddit
        const responseReddit = await fetch(
          "http://localhost:8080/social/reddit/trends?topic=Fitness&days=30"
        );
        const dataReddit = await responseReddit.json();
        setDatosReddit(dataReddit);

        // Obtenemos datos random (para simular "web")
        const responseRandom = await fetch(
          "http://localhost:8080/social/random/trends?topic=Fitness&days=30"
        );
        const dataRandom = await responseRandom.json();
        setDatosRandom(dataRandom);
      } catch (error) {
        console.error("Error al obtener datos:", error);
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
      <h1 className="text-3xl font-bold mb-4">Fitness / Tend1</h1>

      <div className="flex items-start mb-6 w-full">
        <div className="flex-grow bg-white rounded shadow p-6 h-[450px]">
          <GraficaRedes
            seleccionadas={seleccionadas}
            datosReddit={datosReddit}
            datosRandom={datosRandom}
          />
        </div>

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

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-bold text-lg mb-2">
          Análisis general de las tendencias
        </h2>
        <p>
          Como puedes ver en la gráfica, tu campaña tiene una mejor recepción en
          YouTube que en Reddit. Por lo tanto, proponemos que redobles tus
          esfuerzos en esta plataforma y reanudes una estrategia nueva en Reddit
          para lograr más permeabilidad en el público.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-bold text-lg mb-2">Recomendaciones</h2>
        <p>
          Te recomendamos que inviertas un 10% más en publicidad en YouTube y
          cambies de estrategia en Reddit, intentando contratar influencers con
          Karma más alto para llegar a más público.
        </p>
      </div>
    </div>
  );
};

export default ResumenTendencias10;