import React from "react";

// Importación de imágenes desde assets
import imgIA from "../assets/images/ia.png";
import imgEstrategia from "../assets/images/estrategia.png";
import imgData from "../assets/images/data.png";

const servicios = [
  {
    titulo: "Análisis de Tendencia con Inteligencia Artificial",
    descripcion: [
      "Procesamiento de datos en tiempo real desde redes sociales, noticias, blogs y búsquedas.",
      "Identificación de patrones emergentes y cambios en el mercado para anticiparse a la competencia.",
      "Evaluación de impacto de campañas y gestión de reputación de manera anticipada.",
    ],
    imagen: imgIA,
  },
  {
    titulo: "Monitoreo y Optimización de estrategias",
    descripcion: [
      "Medición de percepción de tu marca y el rendimiento de tus campañas con análisis de sentimiento.",
      "Aplicación de modelos predictivos para ajustar estrategias con precisión y automatización.",
      "Desarrollo de estrategias fundamentadas en percepciones reales del consumidor.",
    ],
    imagen: imgEstrategia,
  },
  {
    titulo: "Reportes y Visualización Inteligente de Datos",
    descripcion: [
      "Transformación de datos complejos en decisiones estratégicas con dashboards interactivos.",
      "Podrás acceder a reportes detallados con información clave e insights prácticos en minutos.",
      "Optimización de tiempo y recursos para una toma de decisiones más eficientes.",
    ],
    imagen: imgData,
  },
];

const Servicios = () => {
  return (
    <div className="min-h-screen bg-[#0B1C47] text-white px-8 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Servicios</h1>
      <div className="grid md:grid-cols-3 gap-10">
        {servicios.map((servicio, idx) => (
          <div
            key={idx}
            className="bg-[#1E40AF] rounded-xl shadow-lg p-6 text-white text-sm hover:scale-105 transition-transform duration-300"
          >
            <img
              src={servicio.imagen}
              alt={servicio.titulo}
              className="w-full h-40 object-contain mb-4 rounded"
            />
            <h2 className="text-lg font-semibold mb-3">{servicio.titulo}</h2>
            <ul className="list-disc ml-4 space-y-1 text-slate-100">
              {servicio.descripcion.map((item, index) => (
                <li key={index} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servicios;
