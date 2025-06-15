/**
 * @file DetalleTendencia10.jsx
 * @author Fer Ponce, Pablo Alonso, Yael Pérez, Ignacio Solís
 * @description Página encargada de mostrar el detalle de tendencias de una palabra específica a traves de Reddit, YouTube y Web.
 *              Permite seleccionar las redes sociales a mostrar y genera un resumen utilizando IA.
 */
import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import CustomButton from "../../components/CustomButton"
import { LuMousePointerClick } from "react-icons/lu";
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
  { id: "youtube", nombre: "YouTube", color: "#D32F2F" },
  { id: "reddit", nombre: "Reddit", color: "#F57C00" },
  { id: "web", nombre: "Web", color: "#7B3F99" },
];

const DetalleTendencias10 = () => {
  const location = useLocation();
  const idCampana = location.state?.id_campana;
  const keywordSeleccionada = location.state?.palabra;
  const navigate = useNavigate();

  const [seleccionadas, setSeleccionadas] = useState(["youtube", "reddit", "web"]);
  const [datosReddit, setDatosReddit] = useState([]);
  const [datosYouTube, setDatosYouTube] = useState([]);
  const [datosWeb, setDatosWeb] = useState([]);
  const [resumenIA, setResumenIA] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const datosApi = import.meta.env.VITE_API_URL;

  // Obtiene el resumen generado por la IA
  useEffect(() => {
    if (!idCampana) return;
    const fetchResumen = async () => {
      try {
        const res = await fetch(
          `${datosApi}/api/resumen-campana/${idCampana}`
        );
        const ct = res.headers.get("content-type") || "";
        if (!res.ok) {
          console.error("Error IA status", res.status);
          setResumenIA("Error obteniendo resumen IA.");
          return;
        }
        if (!ct.includes("application/json")) {
          const text = await res.text();
          console.error("IA endpoint HTML:", text);
          setResumenIA("Respuesta inesperada de IA.");
          return;
        }
        const { resumen } = await res.json();
        setResumenIA(resumen ?? "[Sin resumen]");
      } catch (err) {
        console.error("fetchResumen error:", err);
        setResumenIA("Error al obtener resumen IA.");
      }
    };
    fetchResumen();
  }, [idCampana, datosApi]);

  // Obtiene todas las graficas por red social
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const baseUrl = `${datosApi}/api`;
        const encodedKeyword = encodeURIComponent(keywordSeleccionada);

        const [redditRes, youtubeRes, webRes] = await Promise.all([
          fetch(`${baseUrl}/reddit/trends?topic=${encodedKeyword}`),
          fetch(`${baseUrl}/youtube/trends?topic=${encodedKeyword}`),
          fetch(`${baseUrl}/web/trends?topic=${encodedKeyword}`)
        ]);

        if (!redditRes.ok || !youtubeRes.ok || !webRes.ok) {
          throw new Error("No se pudieron cargar los datos.");
        }

        const [redditData, youtubeData, webData] = await Promise.all([
          redditRes.json(),
          youtubeRes.json(),
          webRes.json()
        ]);

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
  }, [keywordSeleccionada, idCampana, datosApi]);

  const toggleRed = (id) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  // Se definen las fechas para la grafica de mapa de calor
  const allDates = useMemo(() => {
    const fechas = new Set();
    datosReddit.forEach((d) => fechas.add(d._id));
    datosYouTube.forEach((d) => fechas.add(d._id));
    datosWeb.forEach((d) => fechas.add(d._id));
    return Array.from(fechas).sort();
  }, [datosReddit, datosYouTube, datosWeb]);

  const data = {
    labels: allDates,
    datasets: redes
      .filter((r) => seleccionadas.includes(r.id))
      .map((r) => {
        const fuente =
          r.id === "reddit" ? datosReddit :
          r.id === "youtube" ? datosYouTube :
          datosWeb;

        const dataByDate = {};
        fuente.forEach((d) => {
          const valor = d.max_buzzscore || d.avg_buzzscore || 0;
          if (!dataByDate[d._id] || valor > dataByDate[d._id]) {
            dataByDate[d._id] = valor;
          }
        });

        const puntos = allDates.map((fecha) => dataByDate[fecha] || 0);

        return {
          label: r.nombre,
          data: puntos,
          borderColor: r.color,
          backgroundColor: r.color,
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 2,
        };
      }),
  };

  // Configuración de las graficas
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100,
        ticks: { stepSize: 20 },
        title: {
          display: true,
          text: "Relevancia por red social",
          font: { size: 14, weight: "bold" },
        },
      },
      x: {
        ticks: { maxRotation: 45, minRotation: 45 },
        title: {
          display: true,
          text: "Fechas",
          font: { size: 14, weight: "bold" },
        },
      },
    },
  };

  if (!idCampana || !keywordSeleccionada) {
    return <div className="p-6 text-red-600">No se proporcionaron datos válidos.</div>;
  }

  if (loading) return <div className="p-6">Cargando...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  function Regresar() {
    navigate("/users/resumen-tendencias", {
      state: { id_campana: idCampana },
    });
  }


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Palabra: {keywordSeleccionada}</h1>

      <div className="flex gap-6">
        <div className="flex-1 bg-white p-4 rounded shadow h-[450px]">
          <Line data={data} options={options} />
        </div>
        <div className="w-40 space-y-2 bg-white rounded-sm p-4">
          <h3 className="font-medium">Redes Sociales</h3>
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

      <div className="mt-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer"
          onClick={Regresar}
        >
          Volver a la página anterior
        </button>
      </div>

      {/*Aquí se pone el resumen IA*/}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-bold text-lg mb-2">Resumen generado por IA</h2>
        <p>{resumenIA}</p>
      </div>
    </div>
  );
};

export default DetalleTendencias10;
