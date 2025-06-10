import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const ResumenTendencias9 = () => {
  const [datosPromedio, setDatosPromedio] = useState([]);
  const [labels, setLabels] = useState([]);
  const [palabrasClave, setPalabrasClave] = useState([]);
  const [mostrarPalabras, setMostrarPalabras] = useState({});
  const [resumenIA, setResumenIA] = useState("");

  const { state } = useLocation();
  const navigate = useNavigate();
  const campanaId = state?.id_campana;

  const datosApi = import.meta.env.VITE_API_URL; // e.g. http://127.0.0.1:8080

  useEffect(() => {
    if (!campanaId) return;
    const fetchData = async () => {
      try {
        // 1. Obtener keywords
        const resK = await fetch(`${datosApi}/keyword/${campanaId}?days=30`);
        if (!resK.ok) return;
        const { keywords } = await resK.json();
        if (!keywords.length) return;

        setPalabrasClave(keywords);
        setMostrarPalabras(keywords.reduce((m, p) => ({ ...m, [p]: true }), {}));

        // 2. Para cada palabra, llamar al endpoint correcto de datos normalizados
        const promesas = keywords.map(async (palabra) => {
          const url = new URL(`${datosApi}/keyword/${campanaId}/normalized`);
          url.searchParams.append("topic", palabra);
          url.searchParams.append("days", "30");

          const res = await fetch(url.href);
          if (!res.ok) return null;
          const ct = res.headers.get("content-type") || "";
          if (!ct.includes("application/json")) return null;

          const { resultados } = await res.json();
          return {
            palabra,
            buzzcores: resultados.map((r) => r.buzzcore_promedio),
            fechas: resultados.map((r) => r.fecha),
          };
        });

        const resultados = await Promise.all(promesas);
        const datos = [];
        let fechasBase = [];
        resultados.forEach((item) => {
          if (item) {
            datos.push(item.buzzcores);
            if (!fechasBase.length) fechasBase = item.fechas;
          }
        });

        setDatosPromedio(datos);
        setLabels(fechasBase);
      } catch (err) {
        console.error("fetchData error:", err);
      }
    };
    fetchData();
  }, [campanaId, datosApi]);

  useEffect(() => {
    if (!campanaId) return;
    const fetchResumen = async () => {
      try {
        const res = await fetch(
          `${datosApi}/api/resumen-campana/${campanaId}?days=30`
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

  const toggleCheckbox = (palabra) => {
    setMostrarPalabras((prev) => ({ ...prev, [palabra]: !prev[palabra] }));
  };

  const irADetalle = (palabra) => {
    navigate(
      "/users/detalletendencia",
      { state: { id_campana: campanaId, palabra } }
    );
  };

  const colores = [
    "#7B3F99", "#D32F2F", "#F57C00", "#1976D2",
    "#388E3C", "#F06292", "#0097A7", "#AFB42B",
  ];

  return (
    <div className="pt-6 px-6 w-full">
      <h1 className="text-3xl font-bold mb-4">Análisis general de tendencias</h1>
      <div className="flex items-start mb-6 w-full">
        <div className="flex-grow bg-white rounded shadow p-6 h-[450px]">
          <Line
            data={{
              labels,
              datasets: datosPromedio.map((arr, i) => ({
                label: palabrasClave[i],
                data: mostrarPalabras[palabrasClave[i]] ? arr : [],
                borderColor: colores[i % colores.length],
                fill: false,
                tension: 0.4,
              })),
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: "top" } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>
        <div className="ml-6 flex flex-col gap-3 w-[160px] shrink-0 mt-2">
          {palabrasClave.map((pal, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={mostrarPalabras[pal]}
                onChange={() => toggleCheckbox(pal)}
              />
              <span
                className="font-medium text-sm text-black hover:underline"
                onClick={() => irADetalle(pal)}
              >
                {pal}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <Link to="/users/adminproductos">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Volver a campañas
          </button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-bold text-lg mb-2">Resumen generado por IA</h2>
        <p className="text-gray-800 whitespace-pre-wrap">{resumenIA}</p>
      </div>
    </div>
  );
};

export default ResumenTendencias9;