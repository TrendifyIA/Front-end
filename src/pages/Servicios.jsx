/**
 * Componente: Servicios
 * Descripción:Muestra una sección visual con tarjetas de servicios ofrecidos por Trendify, cada una 
 * destacando funcionalidades específicas como análisis con IA, monitoreo estratégico 
 * y visualización de datos.
 * Autoría: Fernanda Ponce Maciel
 * Fecha: 15 de junio de 2025
 */

import React from "react";
import imgAI from "../assets/images/ia.png";
import imgEstrategia from "../assets/images/estrategia.png";
import imgData from "../assets/images/data.jpg";

const Servicios = () => {
/**
   * Lista de servicios disponibles.
   * Cada objeto incluye título, imagen y lista de puntos clave.
   */
  
     const servicios = [
       {
         titulo: "Análisis de Tendencia con Inteligencia Artificial",
         imagen: imgAI,
         puntos: [
           "Procesamiento de datos en tiempo real desde redes sociales, noticias, blogs y búsquedas.",
           "Identificación de patrones emergentes y cambios en el mercado para anticiparse a la competencia.",
           "Evaluación de impacto de campañas y gestión de reputación de manera anticipada.",
         ],
       },
       {
         titulo: "Monitoreo y Optimización de estrategias",
         imagen: imgEstrategia,
         puntos: [
           "Medición de percepción de tu marca y rendimiento de campañas con análisis de sentimiento.",
           "Aplicación de modelos predictivos para ajustar estrategias con precisión.",
           "Desarrollo de estrategias fundamentadas en percepciones reales del consumidor.",
         ],
       },
       {
         titulo: "Reportes y Visualización Inteligente de Datos",
         imagen: imgData,
         puntos: [
           "Transformación de datos complejos en dashboards interactivos.",
           "Acceso a reportes detallados con insights clave.",
           "Optimización del tiempo y recursos para decisiones más eficientes.",
         ],
       },
     ];
   
     return (
       <div className="bg-[#082C57] min-h-screen p-8 text-white">
         <h1 className="text-4xl font-bold mb-8 text-center">Servicios</h1>
         <div className="grid md:grid-cols-3 gap-6">
           {servicios.map((servicio, index) => (
             <div key={index} className="bg-[#178EFF] rounded-xl p-4 shadow-md">
               <img
                 src={servicio.imagen}
                 alt={servicio.titulo}
                 className="w-full h-48 object-cover rounded-lg mb-4"
               />
               <h2 className="text-lg font-semibold mb-2 text-white">
                 {servicio.titulo}
               </h2>
               <ul className="text-sm list-disc ml-4">
                 {servicio.puntos.map((punto, i) => (
                   <li key={i}>{punto}</li>
                 ))}
               </ul>
             </div>
           ))}
         </div>
       </div>
     );
   };
   
   export default Servicios;