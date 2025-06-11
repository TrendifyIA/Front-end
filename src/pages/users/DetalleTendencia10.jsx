import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom"
import { LuMousePointerClick } from "react-icons/lu";
import CustomButton from "../../components/CustomButton"
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

const GraficaRedes = ({ seleccionadas, datosReddit, datosYouTube, datosWeb }) => {
  
  const allDates = Array.from(
    new Set([
      ...datosReddit.map((d) => d._id),
      ...datosYouTube.map((d) => d._id),
      ...datosWeb.map((d) => d._id),
    ])
  ).sort();

  const data = {
    labels: allDates,
    datasets: redes
      .filter((r) => seleccionadas.includes(r.id))
      .map((r) => {
        const datos =
          r.id === "reddit" ? datosReddit :
          r.id === "youtube" ? datosYouTube :
          datosWeb;

        const dataByDate = {};
        datos.forEach((d) => {
          const currentValue = d.max_buzzscore || d.avg_buzzscore || 0;
          if (!dataByDate[d._id] || currentValue > dataByDate[d._id]) {
            dataByDate[d._id] = currentValue;
          }
        });

        const dataPoints = allDates.map((date) => dataByDate[date] || 0);

        return {
          label: r.nombre,
          data: dataPoints,
          borderColor: r.color,
          backgroundColor: r.color,
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 2,
        };
      }),
  };

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
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
    x: {
      ticks: { maxRotation: 45, minRotation: 45 },
      title: {
        display: true,
        text: "Fechas",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
  },
};

  return <Line data={data} options={options} />;
};

const DetalleTendencias10 = () => {
  const location = useLocation();
  const idCampana = location.state?.id_campana;
  const keywordSeleccionada = location.state?.palabra;
  const navigate = useNavigate();

  const [seleccionadas, setSeleccionadas] = useState(["youtube", "reddit", "web"]);
  const [datosReddit, setDatosReddit] = useState([]);
  const [datosYouTube, setDatosYouTube] = useState([]);
  const [datosWeb, setDatosWeb] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [resumenIA, setResumenIA] = useState("")

  if (!idCampana || !keywordSeleccionada) {
    return <div className="p-6 text-red-600">No se proporcionaron datos válidos.</div>;
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!idCampana) return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/keyword/${idCampana}?days=30`
        );
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Respuesta inesperada:", text);
          throw new Error("Respuesta inválida del endpoint /keyword/");
        }
        const data = await res.json();
        const palabras = data.keywords;
        setPalabrasClave(palabras);

        const nuevosPromedios = [];
        let labelsTemporales = [];

        for (const palabra of palabras) {
          try {
            const resPalabra = await fetch(
              `${import.meta.env.VITE_API_URL}/api/data/normalized?topic=${palabra}?days=30`
            );
            if (!resPalabra.ok)
              throw new Error("Error al obtener datos de " + palabra);
            const dataPalabra = await resPalabra.json();

            const buzzcores = dataPalabra.resultados.map(
              (r) => r.buzzcore_promedio
            );
            const fechas = dataPalabra.resultados.map((r) => r.fecha);

            nuevosPromedios.push(buzzcores);

            if (labelsTemporales.length === 0) {
              labelsTemporales = fechas;
            }
          } catch (err) {
            console.error("Error al obtener datos de la palabra:", err);
          }
        }

        setDatosPromedio(nuevosPromedios);
        setLabels(labelsTemporales);
      } catch (error) {
        console.error("Error general:", error);
      }
    };

    fetchData();
  }, [idCampana]);

  // Cargar resumen IA
  useEffect(() => {
    const obtenerResumenIA = async () => {
      if (!idCampana) return;
      try {
        const resumenURL = `${import.meta.env.VITE_BACKEND_URL.replace("/preguntar", "")}/api/resumen-campana/${idCampana}?days=30`
        const res = await fetch(resumenURL);

        if (!res.ok) throw new Error("Error al obtener el resumen");
        const data = await res.json();
        setResumenIA(data.resumen || "[Sin resumen generado]");
      } catch (error) {
        console.error("Error al obtener resumen de IA:", error);
        setResumenIA("No se pudo obtener el resumen. Intenta de nuevo.");
      }
    };

    obtenerResumenIA();
  }, [idCampana]);

  useEffect(() => {
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

  function Regresar(){
    navigate("/users/resumen-tendencias", {
      state: { id_campana: idCampana },
    });
  }

  const Laila = () => {
    window.location.href = "https://www.google.com";
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Palabra: {keywordSeleccionada}</h1>
      <div className="flex gap-6">
        <div className="flex-1 bg-white p-4 rounded shadow h-[450px]">
          <GraficaRedes
            seleccionadas={seleccionadas}
            datosReddit={datosReddit}
            datosYouTube={datosYouTube}
            datosWeb={datosWeb}
          />
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer" onClick={Regresar}>
          Volver a la página de campañas
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-bold text-lg mb-2">Análisis de tendencias</h2>
        <p>{resumenIA}</p>
      </div>

      <div className="fixed bottom-10 right-6 z-50 group mr-9">
        <CustomButton
          texto={
            <span className="flex items-center gap-2">
              Descubre Laila <LuMousePointerClick className="text-2xl font-medium" />
            </span>
          }
          onClick={Laila}
          tipo="normal"
          extraClases={`
            bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-900
            bg-[length:200%_200%] animate-gradient-x
            text-white font-bold py-3 px-6 rounded-full
            transition-transform transform hover:scale-105
            shadow-2xl
          `}
        />

        {/* Tooltip al hacer hover */}
        <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-3 w-72 px-4 py-2 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-500
            bg-[length:200%_200%] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
          Conoce a Laila, la primera asistente de IA centrada en marketing. ¡Da clic y descubre el futuro del Marketing!
        </div>
      </div>
    </div>
  );
};

export default DetalleTendencias10;