import React, { useEffect, useState, useContext } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { ProcesamientoContext } from "../../context/ProveedorProcesado"; // Ajusta la ruta real

const Procesando = () => {
  const location = useLocation();
  const { setProcesando } = useContext(ProcesamientoContext);
  const { procesando } = useContext(ProcesamientoContext);

  const [estado, setEstado] = useState("procesando");

  useEffect(() => {
    if (!procesando) {
      setEstado("completado");
    } else {
      setEstado("procesando");
    }
  }, [procesando]);

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      {estado === "procesando" ? (
        <>
          <h2 className="text-3xl font-bold mb-10">
            PROCESANDO
            <span className="inline-block animate-pulse">.</span>
            <span className="inline-block animate-pulse delay-200">.</span>
            <span className="inline-block animate-pulse delay-500">.</span>
          </h2>

          <div className="relative w-80 h-10 bg-white rounded-full border-2 border-[#0B2C63] shadow-md px-3 flex items-center justify-start overflow-hidden">
            <div className="flex space-x-1 animate-marquee">
              {[...Array(18)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: `hsl(${220 + i * 5}, 100%, ${
                      80 - i * 2
                    }%)`,
                  }}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 animate-fadeIn">
          <AiOutlineCheckCircle className="text-green-500 text-6xl animate-bounce" />
          <h2 className="text-2xl font-bold text-green-600">
            ¡Análisis completo!
          </h2>
        </div>
      )}

      {estado === "procesando" && (
        <div className="absolute bottom-0 w-full bg-yellow-300 text-black text-center py-3 font-medium shadow-md">
          ⚠️ No recargues la página o el proceso se reiniciará
        </div>
      )}

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
