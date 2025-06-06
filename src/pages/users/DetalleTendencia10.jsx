import React, { useEffect, useState } from "react";
import { /* useSearchParams */ } from "react-router-dom";
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
  { id: "youtube", nombre: "YouTube", color: "#c4302b" },
  { id: "reddit", nombre: "Reddit", color: "#FF5700" },
  { id: "web", nombre: "Web", color: "#4A90E2" }
];

const GraficaRedes = ({ seleccionadas, datosReddit, datosYouTube, datosWeb }) => {
  const allDates = Array.from(
    new Set([
      ...datosReddit.map(d => d._id),
      ...datosYouTube.map(d => d._id),
      ...datosWeb.map(d => d._id)
    ])
  ).sort();

  const data = {
    labels: allDates,
    datasets: redes
      .filter((r) => seleccionadas.includes(r.id))
      .map((r) => {
        let dataPoints = [];

        const datos = r.id === "reddit" ? datosReddit :
                      r.id === "youtube" ? datosYouTube :
                      datosWeb;

        const dataByDate = {};
        datos.forEach(d => {
          const currentValue = d.max_buzzscore || d.avg_buzzscore || 0;
          if (!dataByDate[d._id] || currentValue > dataByDate[d._id]) {
            dataByDate[d._id] = currentValue;
          }
        });
        dataPoints = allDates.map(date => dataByDate[date] || 0);

        return {
          label: r.nombre,
          data: dataPoints,
          borderColor: r.color,
          backgroundColor: r.color,
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 4,
        };
      }),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.raw.toFixed(2)}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100,
        ticks: { stepSize: 20 }
      },
      x: {
        ticks: { maxRotation: 45, minRotation: 45 }
      }
    },
  };

  return <Line data={data} options={options} />;
};

const DetalleTendencias10 = () => {
  const [seleccionadas, setSeleccionadas] = useState(["youtube", "reddit", "web"]);
  const [datosReddit, setDatosReddit] = useState([]);
  const [datosYouTube, setDatosYouTube] = useState([]);
  const [datosWeb, setDatosWeb] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [searchParams] = useSearchParams();
  // const idCampana = searchParams.get("id_campana");
  // const keywordSeleccionada = searchParams.get("keyword");

  // Mientras no haya navegación desde otra pantalla
  const idCampana = "13";
  const keywordSeleccionada = "biogás";

  useEffect(() => {
    if (!keywordSeleccionada || !idCampana) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const baseUrl = "http://127.0.0.1:8080/api";

        const [redditRes, youtubeRes, webRes] = await Promise.all([
          fetch(`${baseUrl}/reddit/trends?topic=${encodeURIComponent(keywordSeleccionada)}&days=30`),
          fetch(`${baseUrl}/youtube/trends?topic=${encodeURIComponent(keywordSeleccionada)}&days=30`),
          fetch(`${baseUrl}/web/trends?topic=${encodeURIComponent(keywordSeleccionada)}&days=30`)
        ]);

        if (!redditRes.ok || !youtubeRes.ok || !webRes.ok) {
          throw new Error("No se pudieron cargar los datos.");
        }

        const [redditData, youtubeData, webData] = await Promise.all([
          redditRes.json(),
          youtubeRes.json(),
          webRes.json()
        ]);

        console.log("Datos Reddit:", redditData);
        console.log("Datos YouTube:", youtubeData);
        console.log("Datos Web:", webData);

        setDatosReddit(redditData);
        setDatosYouTube(youtubeData);
        setDatosWeb(webData);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [keywordSeleccionada, idCampana]);

  const toggleRed = (id) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  if (loading) return <div className="p-6">Cargando...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{keywordSeleccionada} / Tendencias</h1>
      <div className="flex gap-6">
        <div className="flex-1 bg-white p-4 rounded shadow h-[450px]">
          <GraficaRedes
            seleccionadas={seleccionadas}
            datosReddit={datosReddit}
            datosYouTube={datosYouTube}
            datosWeb={datosWeb}
          />
        </div>
        <div className="w-40 space-y-2">
          {redes.map((r) => (
            <label key={r.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={seleccionadas.includes(r.id)}
                onChange={() => toggleRed(r.id)}
              />
              <span>{r.nombre}</span>
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

export default DetalleTendencias10;
