import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
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
      },
      x: {
        ticks: { maxRotation: 45, minRotation: 45 },
      },
    },
  };

  return <Line data={data} options={options} />;
};

const DetalleTendencias10 = () => {
  const location = useLocation();
  const idCampana = location.state?.id_campana;
  const keywordSeleccionada = location.state?.palabra;

  const [seleccionadas, setSeleccionadas] = useState(["youtube", "reddit", "web"]);
  const [datosReddit, setDatosReddit] = useState([]);
  const [datosYouTube, setDatosYouTube] = useState([]);
  const [datosWeb, setDatosWeb] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!idCampana || !keywordSeleccionada) {
    return <div className="p-6 text-red-600">No se proporcionaron datos válidos.</div>;
  }

const DetalleTendencia10 = () => {
  const [mostrar, setMostrar] = useState(true);
  const [datosPromedio, setDatosPromedio] = useState([]);
  const [labels, setLabels] = useState([]);
  const [palabrasClave, setPalabrasClave] = useState([]);
  const [resumenIA, setResumenIA] = useState("");

  const location = useLocation();
  const campanaId = location.state?.id_campana;

  // Cargar palabras clave y datos de tendencia
  useEffect(() => {
    const fetchData = async () => {
      if (!campanaId) return;
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
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/keyword/${campanaId}`
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
              `${import.meta.env.VITE_API_URL}/api/data/normalized?topic=${palabra}`
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
  }, [campanaId]);

  // Cargar resumen IA
  useEffect(() => {
    const obtenerResumenIA = async () => {
      if (!campanaId) return;
      try {
        const resumenURL = `${import.meta.env.VITE_BACKEND_URL.replace("/preguntar", "")}/api/resumen-campana/${campanaId}`;
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
  }, [campanaId]);

  const colores = [
    "#7B3F99", // morado
    "#D32F2F", // rojo
    "#F57C00", // naranja
    "#1976D2", // azul
    "#388E3C", // verde
    "#F06292", // rosa
    "#0097A7", // turquesa
    "#AFB42B", // lima
  ];

  const data = {
    labels,
    datasets: datosPromedio.map((dataArray, idx) => ({
      label: palabrasClave[idx],
      data: mostrar ? dataArray : [],
      borderColor: colores[idx % colores.length],
      backgroundColor: colores[idx % colores.length],
      fill: false,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
    scales: { y: { beginAtZero: true } },
  };

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
    <div className="pt-6 px-6 w-full">
      <h1 className="text-3xl font-bold mb-4">
        Análisis general de tendencias
      </h1>

      <div className="flex items-start mb-6 w-full">
        <div className="flex-grow bg-white rounded shadow p-6 h-[450px]">
          <Line data={data} options={options} />
        </div>

        <div className="ml-6 flex flex-col gap-3 w-[160px] shrink-0 mt-2">
          {palabrasClave.map((palabra, index) => (
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={mostrar}
                onChange={() => setMostrar((prev) => !prev)}
              />
              <span className="font-medium text-sm text-black hover:underline">
                {palabra}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6 mt-6">
        <h2 className="font-bold text-lg mb-2">Análisis general de las tendencias</h2>
        <p>
          Como puedes ver en la gráfica, tu campaña tiene una mejor recepción en
          YouTube que en Reddit. Por lo tanto, proponemos que redobles tus
          esfuerzos en esta plataforma y reanudes una estrategia nueva en Reddit
          para lograr más permeabilidad en el público.
        </p>

      <div>
        <Link to="/users/adminproductos">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Volver a la página de campañas
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-bold text-lg mb-2">Análisis de tendencias</h2>
        <p>{resumenIA}</p>
      </div>
    </div>
  );
};

export default DetalleTendencias10;
export default DetalleTendencia10;