import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
  { id: "youtube", nombre: "YouTube" },
  { id: "reddit", nombre: "Reddit" },
  { id: "web", nombre: "Web" },
];

const DetalleTendencias10 = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const idCampana = location.state?.id_campana;
  const keyword = location.state?.palabra;

  const [datosReddit, setDatosReddit] = useState([]);
  const [datosYouTube, setDatosYouTube] = useState([]);
  const [datosWeb, setDatosWeb] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumenIA, setResumenIA] = useState("");

  // 1) Carga de datos de tendencias
  useEffect(() => {
    if (!idCampana || !keyword) return;
    (async () => {
      setLoading(true);
      try {
        const base = BACKEND_URL.replace(/\/preguntar$/, "") + "/api";
        const [r1, r2, r3] = await Promise.all([
          fetch(`${base}/reddit/trends?topic=${encodeURIComponent(keyword)}&days=30`),
          fetch(`${base}/youtube/trends?topic=${encodeURIComponent(keyword)}&days=30`),
          fetch(`${base}/web/trends?topic=${encodeURIComponent(keyword)}&days=30`),
        ]);
        if (!r1.ok || !r2.ok || !r3.ok) throw new Error("Error al cargar datos de tendencias");
        const [d1, d2, d3] = await Promise.all([r1.json(), r2.json(), r3.json()]);
        setDatosReddit(d1);
        setDatosYouTube(d2);
        setDatosWeb(d3);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [idCampana, keyword, BACKEND_URL]);

  // 2) Carga del resumen de IA para esta palabra
  useEffect(() => {
  const obtenerResumenIA = async () => {
    if (!campanaId) return;
    try {
      const resumenURL = `${import.meta.env.VITE_BACKEND_URL}/api/resumen-campana/${campanaId}`;
      const res = await fetch(resumenURL, {
        headers: { "ngrok-skip-browser-warning": "true" }
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        setResumenIA(data.resumen || "[Sin resumen generado]");
      } catch (e) {
        console.error("Respuesta no válida (no JSON):", text);
        setResumenIA("Error: respuesta inválida del servidor.");
      }
    } catch (error) {
      console.error("Error al obtener resumen de IA:", error);
      setResumenIA("No se pudo obtener el resumen. Intenta de nuevo.");
    }
  };

  obtenerResumenIA();
}, [campanaId]);

  if (loading) return <div className="p-6">Cargando...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  // Preparar datos para la gráfica
  const allDates = Array.from(
    new Set([
      ...datosReddit.map((d) => d._id),
      ...datosYouTube.map((d) => d._id),
      ...datosWeb.map((d) => d._id),
    ])
  ).sort();

  const data = {
    labels: allDates,
    datasets: redes.map((r) => {
      const arr = r.id === "reddit"
        ? datosReddit
        : r.id === "youtube"
          ? datosYouTube
          : datosWeb;
      const byDate = {};
      arr.forEach((d) => {
        const val = d.max_buzzscore ?? d.avg_buzzscore ?? 0;
        byDate[d._id] = Math.max(byDate[d._id] ?? 0, val);
      });
      return {
        label: r.nombre,
        data: allDates.map((d) => byDate[d] || 0),
        borderColor: undefined,
        backgroundColor: undefined,
        tension: 0.4,
        pointRadius: 2,
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: {
      y: { beginAtZero: true, suggestedMax: 100, ticks: { stepSize: 20 } },
      x: { ticks: { maxRotation: 45, minRotation: 45 } },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Palabra: {keyword}</h1>

      <div className="flex gap-6 mb-6">
        <div className="flex-1 bg-white p-4 rounded shadow h-[450px]">
          <Line data={data} options={options} />
        </div>
        <div className="w-40 space-y-2">
          {redes.map((r) => (
            <label key={r.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked
                readOnly
              />
              <span>{r.nombre}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-bold text-lg mb-2">Análisis de tendencias</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {resumenIA}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default DetalleTendencias10;