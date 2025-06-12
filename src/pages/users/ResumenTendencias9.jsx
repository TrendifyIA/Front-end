import React from 'react';
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Line, Chart, Bar } from "react-chartjs-2";
import { LuMousePointerClick } from "react-icons/lu";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  TimeScale,
  BarElement
} from "chart.js";

import "chartjs-adapter-date-fns";
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import CustomButton from "../../components/CustomButton"

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  TimeScale,
  MatrixController,
  MatrixElement,
  BarElement,
);

const ResumenTendencias9 = () => {
  const [datosPromedio, setDatosPromedio] = useState([]);
  const [labels, setLabels] = useState([]);
  const [palabrasClave, setPalabrasClave] = useState([]);
  const [mostrarPalabras, setMostrarPalabras] = useState({});
  const [tipoGrafica, setTipoGrafica] = useState("line");
  const [resumenIA, setResumenIA] = useState("")
  
  const location = useLocation();
  const navigate = useNavigate();

  const campanaId = location.state?.id_campana;

  const datosApi = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!campanaId) return;
    const fetchResumen = async () => {
      try {
        const res = await fetch(
          `${datosApi}/api/resumen-campana/${campanaId}`
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
  }, [campanaId, datosApi]);

  useEffect(() => {
    if (!campanaId) return;
    const fetchResumen = async () => {
      try {
        const res = await fetch(
          `${datosApi}/api/resumen-campana/${campanaId}`
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
  }, [campanaId, datosApi]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/keyword/${campanaId}`);
        if (!res.ok) throw new Error("Error al obtener las palabras clave");
        const data = await res.json();
        const palabras = data.keywords;
        setPalabrasClave(palabras);

        const nuevosMostrar = {};
        palabras.forEach((p) => (nuevosMostrar[p] = true));
        setMostrarPalabras(nuevosMostrar);

        const promesas = palabras.map(async (palabra) => {
          const resPalabra = await fetch(
            `http://localhost:8080/api/data/normalized?topic=${palabra}`
          );
          if (!resPalabra.ok)
            throw new Error("Error al obtener datos de " + palabra);
          const dataPalabra = await resPalabra.json();

          return {
            palabra,
            buzzcores: dataPalabra.resultados.map((r) => r.buzzcore_promedio),
            fechas: dataPalabra.resultados.map((r) => r.fecha),
          };
        });

        const resultados = await Promise.all(promesas);
        const nuevosPromedios = [];
        let labelsTemporales = [];

        resultados.forEach((res) => {
          if (res) {
            nuevosPromedios.push(res.buzzcores);
            if (labelsTemporales.length === 0) labelsTemporales = res.fechas;
          }
        });

        setDatosPromedio(nuevosPromedios);
        setLabels(labelsTemporales);
      } catch (error) {
        console.error("Error general:", error);
      }
    };

    fetchData();
  }, [campanaId]);

  // Preparar datos para heatmap
  const heatmapData = React.useMemo(() => {
    if (!datosPromedio.length || !labels.length) return { datasets: [] };

    // calcular min y max
    const allValues = datosPromedio.flat();
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    return {
      datasets: [
        {
          label: 'Relevancia',
          data: datosPromedio.flatMap((fila, rowIndex) =>
            fila.map((valor, colIndex) => ({
              x: labels[colIndex],
              y: palabrasClave[rowIndex],
              v: valor,
            }))
          ),
          backgroundColor: (ctx) => {
            const value = ctx.dataset.data[ctx.dataIndex].v;
            const alpha = (value - minValue) / (maxValue - minValue) || 0;
            return `rgba(220, 53, 69, ${alpha.toFixed(2)})`;
          },
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.2)',
        },
      ],
    };
  }, [datosPromedio, labels, palabrasClave]);

  const heatmapOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        labels,
        offset: true,
        title: { display: true, text: 'Fecha', font: { size: 14, weight: "bold", } },
      },
      y: {
        type: 'category',
        labels: palabrasClave,
        offset: true,
        reverse: true,
        title: { display: true, text: 'Palabra clave', font: { size: 14, weight: "bold", } },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (items) => items[0].dataset.data[items[0].dataIndex].x,
          label: (ctx) => {
            const { y, v } = ctx.dataset.data[ctx.dataIndex];
            return `${y}: ${v}`;
          },
        },
      },
      legend: { display: false },
    },
  };

  const colores = [
    "#7B3F99", "#D32F2F", "#F57C00", "#1976D2",
    "#388E3C", "#F06292", "#0097A7", "#AFB42B"
  ];

  const data = {
    labels: tipoGrafica === "line" ? labels : undefined,
    datasets: datosPromedio.map((dataArray, idx) => {
      const palabra = palabrasClave[idx];
      return {
        label: palabra,
        data: mostrarPalabras[palabra]
          ? tipoGrafica === "line"
            ? dataArray
            : dataArray.map((valor, i) => ({ x: labels[i], y: valor }))
          : [],
        borderColor: colores[idx % colores.length],
        backgroundColor: colores[idx % colores.length],
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        showLine: tipoGrafica === "line",
      };
    }),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
    scales: {
      x: tipoGrafica === "scatter"
        ? {
            type: "time",
            time: { unit: "day", tooltipFormat: "yyyy-MM-dd" },
            title: { display: true, text: "Fechas", font: { size: 14, weight: "bold", } },
          }
        : {
            stacked: tipoGrafica === "bar",
            title: { display: true, text: "Fechas", font: { size: 14, weight: "bold", } },
          },
      y: {
        beginAtZero: true,
        stacked: tipoGrafica === "bar",
        title: { display: true, text: "Relevancia promedio", font: { size: 14, weight: "bold", } },
      },
    },
  };

  const toggleCheckbox = (palabra) => {
    setMostrarPalabras((prev) => ({
      ...prev,
      [palabra]: !prev[palabra],
    }));
  };

  const irADetalle = (palabra) => {
    navigate("/users/detalle-tendencia", {
      state: { palabra, id_campana: campanaId },
    });
  };

  const Laila = () => {
    window.location.href = "http://10.48.65.250:5173";
  }

  return (
    <div className="pt-6 px-6 w-full">
      <h1 className="text-3xl font-bold mb-4">Análisis general de tendencias</h1>

      <div className="mb-4 flex gap-4">
        {["line","scatter","heatmap","bar"].map((tipo) => (
          <label key={tipo} className="flex items-center gap-2">
            <input
              type="radio"
              value={tipo}
              checked={tipoGrafica === tipo}
              onChange={() => setTipoGrafica(tipo)}
            />
            {tipo === 'heatmap' ? 'Mapa de calor' : tipo === 'boxplot' ? 'BoxPlot' : tipo.charAt(0).toUpperCase() + tipo.slice(1)}
          </label>
        ))}
      </div>

      <div className="flex items-start mb-6 w-full">
        <div className="flex-grow bg-white rounded shadow p-6 h-[450px]">
          {tipoGrafica === "heatmap" ? (
            <Chart type="matrix" data={heatmapData} options={heatmapOptions} />
          ) : tipoGrafica === "bar" ? (
            <Bar data={data} options={options} />
          ) : (
            <Line data={data} options={options} />
          )}
        </div>

        <div className="ml-6 flex flex-col gap-3 w-[160px] shrink-0 mt-2 bg-white rounded-sm p-4">
          <h3 className='font-medium'>Tendencias Clave</h3>
          <p className='text-[12px]'>Da clic en la palabra para ver más detalles.</p>
          {palabrasClave.map((palabra, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={mostrarPalabras[palabra]}
                onChange={() => toggleCheckbox(palabra)}
              />
              <span
                className="font-medium text-sm text-black hover:underline"
                onClick={() => irADetalle(palabra)}
              >
                {palabra}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <Link to="/users/adminproductos">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer">
            Volver a la página de campañas
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-bold text-lg mb-2">Resumen generado por IA</h2>
        <p className="text-gray-800 whitespace-pre-wrap">{resumenIA}</p>
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

export default ResumenTendencias9;