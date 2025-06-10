import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Line, Chart, Bar } from "react-chartjs-2";
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

// import {
//   BoxPlotController,
//   BoxAndWhiskers,
// } from 'chartjs-chart-box-and-violin-plot';

import "chartjs-adapter-date-fns";
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

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
  //BoxPlotController,
  //BoxAndWhiskers
);

const ResumenTendencias9 = () => {
  const [datosPromedio, setDatosPromedio] = useState([]);
  const [labels, setLabels] = useState([]);
  const [palabrasClave, setPalabrasClave] = useState([]);
  const [mostrarPalabras, setMostrarPalabras] = useState({});
  const [tipoGrafica, setTipoGrafica] = useState("line")
  const location = useLocation();
  const navigate = useNavigate();

  const campanaId = location.state?.id_campana;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/keyword/${campanaId}`);
        if (!res.ok) throw new Error("Error al obtener las palabras clave");
        const data = await res.json();
        const palabras = data.keywords;
        setPalabrasClave(palabras);

        // Inicializar estado de checkboxes
        const nuevosMostrar = {};
        palabras.forEach((p) => (nuevosMostrar[p] = true));
        setMostrarPalabras(nuevosMostrar);

        // Hacer todas las peticiones en paralelo
        const promesas = palabras.map(async (palabra) => {
          try {
            const resPalabra = await fetch(
              `http://localhost:8080/api/data/normalized?topic=${palabra}`
            );
            if (!resPalabra.ok)
              throw new Error("Error al obtener datos de " + palabra);
            const dataPalabra = await resPalabra.json();

            return {
              palabra,
              buzzcores: dataPalabra.resultados.map(
                (r) => r.buzzcore_promedio
              ),
              fechas: dataPalabra.resultados.map((r) => r.fecha),
            };
          } catch (err) {
            console.error("Error al obtener datos de la palabra:", err);
            return null;
          }
        });

        const resultados = await Promise.all(promesas);
        const nuevosPromedios = [];
        let labelsTemporales = [];

        resultados.forEach((res) => {
          if (res) {
            nuevosPromedios.push(res.buzzcores);
            if (labelsTemporales.length === 0) {
              labelsTemporales = res.fechas;
            }
          }
        });

        setDatosPromedio(nuevosPromedios);
        setLabels(labelsTemporales);
      } catch (error) {
        console.error("Error general:", error);
      }
    };

    fetchData();
  }, []);

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
            : dataArray.map((valor, i) => ({
                x: labels[i],
                y: valor,
              }))
          : [],
        borderColor: colores[idx % colores.length],
        backgroundColor: colores[idx % colores.length],
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        showLine: tipoGrafica === "line", // En scatter, ocultamos la línea
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
      x: tipoGrafica === "scatter"
        ? {
            type: "time",
            time: {
              unit: "day",
              tooltipFormat: "yyyy-MM-dd",
            },
            title: {
              display: true,
              text: "Fechas",
              font: { size: 14 },
            },
          }
        : {
            stacked: tipoGrafica === "bar", // Apilar solo si es de barras
            title: {
              display: true,
              text: "Fechas",
              font: { size: 14 },
            },
          },
      y: {
        beginAtZero: true,
        stacked: tipoGrafica === "bar", // Apilar solo si es de barras
        title: {
          display: true,
          text: "Relevancia promedio",
          font: { size: 14 },
        },
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
      state: {
        palabra,
        id_campana: campanaId,
      },
    });
  };

  // const datosHeatmap = [];

  // palabrasClave.forEach((palabra, palabraIdx) => {
  //   if (!mostrarPalabras[palabra]) return;

  //   const valores = datosPromedio[palabraIdx];
  //   valores.forEach((valor, i) => {
  //     datosHeatmap.push({
  //       x: labels[i],
  //       y: palabra,
  //       v: valor,
  //     });
  //   });
  // });

  // const heatmapData = {
  //   datasets: [{
  //     label: "Relevancia por palabra",
  //     data: datosHeatmap,
  //     backgroundColor: function(ctx) {
  //       const value = ctx.dataset.data[ctx.dataIndex].v;
  //       // Colorear con una escala simple basada en el valor
  //       const alpha = value / 100;
  //       return `rgba(255, 99, 132, ${alpha})`; // puedes ajustar colores
  //     },
  //     width: ({chart}) => (chart.chartArea || {}).width / labels.length - 1,
  //     height: ({chart}) => (chart.chartArea || {}).height / palabrasClave.length - 1,
  //   }]
  // };

  // const heatmapOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   scales: {
  //     x: {
  //       type: 'category',
  //       labels: labels,
  //       title: {
  //         display: true,
  //         text: "Fecha",
  //       },
  //     },
  //     y: {
  //       type: 'category',
  //       labels: palabrasClave.filter(p => mostrarPalabras[p]),
  //       title: {
  //         display: true,
  //         text: "Palabra clave",
  //       },
  //     }
  //   },
  //   plugins: {
  //     legend: { display: false },
  //     tooltip: {
  //       callbacks: {
  //         title: () => null,
  //         label: (ctx) => `Relevancia: ${ctx.raw.v}`,
  //       }
  //     }
  //   }
  // };

  // const boxPlotData = {
  //   labels,
  //   datasets: palabrasClave.map((palabra, idx) => {
  //     if (!mostrarPalabras[palabra]) return null;

  //     const valores = datosPromedio[idx];

  //     const dataBox = valores.map((val) => {
  //       const spread = val * 0.2; // solo un ejemplo de variabilidad artificial
  //       return {
  //         min: val - spread * 2,
  //         q1: val - spread,
  //         median: val,
  //         q3: val + spread,
  //         max: val + spread * 2
  //       };
  //     });

  //     return {
  //       label: palabra,
  //       data: dataBox,
  //       backgroundColor: colores[idx % colores.length],
  //       borderColor: colores[idx % colores.length],
  //       borderWidth: 1
  //     };
  //   }).filter(Boolean)
  // };

  return (
    <div className="pt-6 px-6 w-full">
      <h1 className="text-3xl font-bold mb-4">
        Análisis general de tendencias
      </h1>

      <div className="mb-4 flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="line"
            checked={tipoGrafica === "line"}
            onChange={() => setTipoGrafica("line")}
          />
          Línea
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="scatter"
            checked={tipoGrafica === "scatter"}
            onChange={() => setTipoGrafica("scatter")}
          />
          Dispersión
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="heatmap"
            checked={tipoGrafica === "heatmap"}
            onChange={() => setTipoGrafica("heatmap")}
          />
          Mapa de calor
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="bar"
            checked={tipoGrafica === "bar"}
            onChange={() => setTipoGrafica("bar")}
          />
          Barras apiladas
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="boxplot"
            checked={tipoGrafica === "boxplot"}
            onChange={() => setTipoGrafica("boxplot")}
          />
          BoxPlot
        </label>
      </div>

      <div className="flex items-start mb-6 w-full">
        <div className="flex-grow bg-white rounded shadow p-6 h-[450px]">
          {tipoGrafica === "heatmap" ? (
            <Chart type="matrix" data={heatmapData} options={heatmapOptions} />
          ) : tipoGrafica === "bar" ? (
            <Bar data={data} options={options} />
          ) : tipoGrafica === "boxplot" ? (
            <Chart type="boxplot" data={boxPlotData} options={options} />
          ) : (
            <Line data={data} options={options} />
          )}
        </div>


        <div className="ml-6 flex flex-col gap-3 w-[160px] shrink-0 mt-2">
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Volver a la página de campañas
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-bold text-lg mb-2">Análisis de tendencias</h2>
        <p>
          Como puedes ver la palabra más relevante durante el mes fue X, seguida
          de Y y Z. Proponemos que pongas especial atención en estas tres para
          promover tu estrategia de marketing ya que puede afectar
          significativamente la campaña.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-bold text-lg mb-2">Recomendaciones</h2>
        <p>
          Como recomendación te sugerimos que en tu campaña implementes
          publicidad relacionada con la tendencia Y y que tu producto vea
          relacionado algo con la tendencia X siendo la principal.
        </p>
      </div>
    </div>
  );
};

export default ResumenTendencias9;