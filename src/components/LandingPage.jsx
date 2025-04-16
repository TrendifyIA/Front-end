import React from "react";
import NavBar from "./NavBar";
import Illustration from "../assets/images/landing1.png"; 
import ChartIcon from "../assets/images/landing2.png"; 
import TrendIcon from "../assets/images/landing3.png"; 
import StrategyIcon from "../assets/images/landing4.png"; 
import SurveyIllustration from "../assets/images/landing5.png"; 
import Illustration2 from "../assets/images/landing6.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0c1f57] flex flex-col font-family">
      <NavBar />

      <div className="flex flex-1 items-center justify-center px-6">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-8xl w-full mx-auto py-16">
          <div className="text-white md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Transforma tu <br />
            forma de <br />
            trabajar
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Analiza, colabora y crea mejores estrategias sin límites. Todo en un solo lugar.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg">
              Probar Ahora
            </button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img src={Illustration} alt="Ilustración" className="w-full max-w-md" />
          </div>
        </div>
      </div>

      <div className="bg-white py-16 px-6">
        <div className="flex items-start gap-4 bg-[#fff] p-4 rounded-lg">
          <div className="space-y-8">
            <div className="flex items-start gap-4 bg-[#E1ECFD] p-4 rounded-lg">
              <img src={ChartIcon} alt="Estadísticas" className="w-30 h-25" />
              <p className="text-gray-700 text-lg">
                Observa estadísticas en tiempo real sobre lo más relevante de tu nicho.
              </p>
            </div>
            <div className="flex items-start gap-4 bg-[#E1ECFD] p-4 rounded-lg">
              <img src={TrendIcon} alt="Tendencias" className="w-30 h-25" />
              <p className="text-gray-700 text-lg">
                Analiza las principales tendencias que afectan tu mercado y toma decisiones.
              </p>
            </div>
            <div className="flex items-start gap-4 bg-[#E1ECFD] p-4 rounded-lg">
              <img src={StrategyIcon} alt="Estrategias" className="w-30 h-25" />
              <p className="text-gray-700 text-lg">
                Realiza nuevas estrategias a partir de datos confiables y comunícalas con tu equipo.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-white mt-28">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-[#fff] ">
            Identifica <br />
            tendencias antes <br />
            que tu <br />
            competencia 
            </h2>
            <p className="text-gray-600 text-lg bg-[#fff]">
              El mercado cambia en segundos. No dejes que tu empresa se quede atrás.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-500 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Encuestas <br />
            inteligentes <br />
            para <br />
            comprender a <br />
            tu audiencia
            </h2>
            <p className="text-lg mb-6">
              Lanza encuestas dirigidas y obtén insights accionables en minutos.
            </p>
          </div>

          <div className="flex justify-center">
            <img src={SurveyIllustration} alt="Encuestas" className="w-full max-w-md" />
          </div>
        </div>
      </div>
      
      <div className="bg-[#E1ECFD] py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
                <img src={Illustration2} alt="Datos que impulsan tu crecimiento" className="w-full max-w-md" />
            </div>
            
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Datos que impulsan tu crecimiento
                    </h2>
                    <ul className="space-y-4 text-lg text-black-700">
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 font-bold">✔</span>
                            Predice cambios en el mercado antes que nadie.
                             </li>
                             <li className="flex items-start gap-2">
                                <span className="text-green-500 font-bold">✔</span>
                                Reduce el tiempo de análisis y aumenta la rentabilidad.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✔</span>
                                    Mejora la percepción de tu marca con mensajes más efectivos.
                                </li>
                    </ul>
            </div>
        </div>
    </div>
    
    <div className="bg-white py-36
     px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Conéctate con el futuro del marketing
                    </h2>
                    <p className="text-lg text-gray-700">
                        Descubre cómo empresas líderes están revolucionando su toma de decisiones con KeySpotting.
                    </p>
            </div>
            
            <div className="relative bg-[#E1ECFD] p-6 rounded-lg shadow-lg">
                <p className="text-gray-700 text-lg italic">
                    "Desde que usamos KeySpotting, nuestras campañas son más precisas y nuestro ROI ha aumentado un 35%."
                </p>
            </div>
         </div>
    </div>

    </div>
  );
};

export default LandingPage;