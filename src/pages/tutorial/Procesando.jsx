/**
 * @file Procesando.jsx
 * @author Alexei Martinez
 * @description Página que muestra una animación de procesamiento y redirige al análisis.
 */


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

/**
 * Componente Procesando
 * Muestra una animación de procesamiento y luego redirige a la página de análisis.
 */
const Procesando = () => {
  const navigate = useNavigate(); // Hook para navegación programática
  const [mensajeIndex, setMensajeIndex] = useState(0); // Índice del mensaje actual
  const [estado, setEstado] = useState("procesando"); // Estado del proceso
  const [displayText, setDisplayText] = useState(""); // Texto mostrado con efecto de tipeo
  const [charIndex, setCharIndex] = useState(0); // Índice del caracter actual en el mensaje

  // Mensajes que se mostrarán secuencialmente
  const mensajes = [
    "🔍 Buscando pistas en YouTube...",
    "🌐 Navegando entre mares web...",
    "🧠 Explorando las mentes de Reddit...",
    "🤖 Consultando a la IA suprema..."
  ];

  /**
   * Efecto para animar el tipeo de los mensajes y controlar el flujo del proceso.
   */
  useEffect(() => {
    // Si aún quedan mensajes por mostrar
    if (mensajeIndex < mensajes.length) {
      // Si aún quedan caracteres por mostrar del mensaje actual
      if (charIndex < mensajes[mensajeIndex].length) {
        const typing = setTimeout(() => {
          setDisplayText(prev => prev + mensajes[mensajeIndex][charIndex]);
          setCharIndex(prev => prev + 1);
        }, 50); // Velocidad del tipeo
        return () => clearTimeout(typing);
      } else {
        // Espera antes de pasar al siguiente mensaje
        const wait = setTimeout(() => {
          setMensajeIndex(prev => prev + 1);
          setCharIndex(0);
          setDisplayText("");
        }, 5000);
        return () => clearTimeout(wait);
      }
    } else {
      // Cuando termina el último mensaje, muestra el estado completado y redirige
      const finalizar = setTimeout(() => {
        setEstado("completado");
        setTimeout(() => {
          navigate("/DetalleTendencia10.jsx");
        }, 2000); // Espera antes de redirigir
      }, 500);
      return () => clearTimeout(finalizar);
    }
  }, [charIndex, mensajeIndex, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 font-family flex flex-col items-center justify-center relative">
      {/* Estado de procesamiento */}
      {estado === "procesando" ? (
        <>
          {/* Título con animación de puntos */}
          <h2 className="text-3xl font-bold mb-4">
            PROCESANDO
            <span className="inline-block animate-pulse">.</span>
            <span className="inline-block animate-pulse delay-200">.</span>
            <span className="inline-block animate-pulse delay-500">.</span>
          </h2>

          {/* Mensaje con efecto de tipeo */}
          <p className="text-lg text-center mb-6 font-mono whitespace-pre-line">
            {displayText}
          </p>

          {/* Barra animada tipo "marquee" */}
          <div className="relative w-80 h-10 bg-white rounded-full border-2 border-[#0B2C63] shadow-md px-3 flex items-center justify-start overflow-hidden">
            <div className="flex space-x-1 animate-marquee">
              {[...Array(18)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: `hsl(${220 + i * 5}, 100%, ${80 - i * 2}%)`,
                  }}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        // Estado completado: muestra icono y mensaje de éxito
        <div className="flex flex-col items-center justify-center space-y-4 animate-fadeIn">
          <AiOutlineCheckCircle className="text-green-500 text-6xl animate-bounce" />
          <h2 className="text-2xl font-bold text-green-600">¡Análisis completo!</h2>
        </div>
      )}

      {/* Advertencia fija en la parte inferior durante el procesamiento */}
      {estado === "procesando" && (
        <div className="fixed bottom-0 w-full bg-yellow-300 text-black text-center py-3 font-medium shadow-md">
          ⚠️ No recargues la página o el proceso se reiniciará
        </div>
      )}

      {/* Estilos CSS para animaciones */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-marquee {
            animation: marquee 2s linear infinite;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Procesando;