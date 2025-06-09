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

const ResumenTendencias9 = () => {
  const [mostrar, setMostrar] = useState(true);
  const [datosPromedio, setDatosPromedio] = useState([]);
  const [labels, setLabels] = useState([]);
  const [palabrasClave, setPalabrasClave] = useState([]);
  const [resumenIA, setResumenIA] = useState("");

  const location = useLocation();
  const campanaId = location.state?.id_campana;

  useEffect(() => {
    const fetchData = async () => {
      if (!campanaId) return;
      try {
        const res = await fetch(`http://localhost:8080/keyword/${campanaId}`);
        const data = await res.json();
        const palabras = data.keywords;
        setPalabrasClave(palabras);

        const nuevosPromedios = [];
        let labelsTemporales = [];

        for (const palabra of palabras) {
          try {
            const resPalabra = await fetch(
              `http://localhost:8080/api/data/normalized?topic=${palabra}`
            );
            const dataPalabra = await resPalabra.json();
            const buzzcores = dataPalabra.resultados.map((r) => r.buzzcore_promedio);
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
      } catch (err) {
        console.error("Error al obtener datos de campaña:", err);
      }
    };

    fetchData();
  }, [campanaId]);

  useEffect(() => {
    const obtenerResumenIA = async () => {
      if (!campanaId) return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/resumen-campana/${campanaId}`
        );

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
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="pt-6 px-6 w-full">
      <h1 className="text-3xl font-bold mb-4">Análisis general de tendencias</h1>

      <div className="flex items-start mb-6 w-full">
        <div className="flex-grow bg-white rounded shadow p-6 h-[450px]">
          <Line data={data} options={options} />
        </div>

        <div className="ml-6 flex flex-col gap-3 w-[160px] shrink-0 mt-2">
          {palabrasClave.map((palabra, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer">
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

      <div className="mb-6">
        <Link to="/users/adminproductos">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Volver a la página de campañas
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-bold text-lg mb-2">Resumen generado por IA</h2>
        {resumenIA
          .split(/(Resumen actual:|Proyección futura:|Recomendaciones estratégicas:)/)
          .filter(Boolean)
          .map((texto, idx) =>
            ["Resumen actual:", "Proyección futura:", "Recomendaciones estratégicas:"].includes(texto.trim()) ? (
              <h3 key={idx} className="font-semibold mt-4">{texto}</h3>
            ) : (
              <p key={idx} className="text-gray-800">{texto.trim()}</p>
            )
          )}
      </div>
    </div>
  );
};

export default ResumenTendencias9;