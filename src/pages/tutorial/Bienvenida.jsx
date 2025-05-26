import React from "react";
import { BsBuildings, BsBoxSeam } from "react-icons/bs";
import { RiMegaphoneLine } from "react-icons/ri";
import CustomButton from "../../components/CustomButton";

const Bienvenida = () => {
  return (
    <div className="min-h-screen w-full font-family flex flex-col">
      <div className="bg-[#02245A] w-full flex flex-col pb-16 min-h-[380px] md:min-h-[420px] pt-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          ¡Bienvenido a Trendify!
        </h1>
        <p className="text-white text-lg md:text-xl text-center max-w-3xl mx-auto mb-4 mt-8">
          Para comenzar a utilizar Trendify, te pediremos algunos datos clave que nos permitirán crear campañas personalizadas y detectar tendencias relevantes que aporten valor a tu empresa.
        </p>
      </div>
      
      <div className="bg-[#e1ecfd] flex-1 w-full relative pb-12">
        <div className="max-w-4xl mx-auto -mt-32">
          <div className="bg-[#99BFFD] rounded-xl shadow-lg px-8 py-18">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center flex-1">
                <h3 className="font-bold text-xl mb-2 text-[#02245A]">Empresa</h3>
                <div className="w-24 h-24 mb-2 bg-[#02245A] rounded-full flex items-center justify-center">
                  <BsBuildings className="text-white" size={56} />
                </div>
                <p className="text-[#222] text-center text-base">
                  Información sobre su empresa como nombre, segmento y público objetivo.
                </p>
              </div>

              <div className="hidden md:block h-1 w-24 bg-[#7ea6e6] mx-2"></div>
              <div className="flex flex-col items-center flex-1">
                <h3 className="font-bold text-xl mb-2 text-[#02245A]">Producto</h3>
                <div className="w-24 h-24 mb-2 bg-[#02245A] rounded-full flex items-center justify-center">
                  <BsBoxSeam className="text-white" size={56} />
                </div>
                <p className="text-[#222] text-center text-base">
                  Información sobre su producto como nombre, segmento y descripción.
                </p>
              </div>
  
              <div className="hidden md:block h-1 w-24 bg-[#7ea6e6] mx-2"></div>
              <div className="flex flex-col items-center flex-1">
                <h3 className="font-bold text-xl mb-2 text-[#02245A]">Campaña</h3>
                <div className="w-24 h-24 mb-2 bg-[#02245A] rounded-full flex items-center justify-center">
                  <RiMegaphoneLine className="text-white" size={56} />
                </div>
                <p className="text-[#222] text-center text-base">
                  Información sobre su campaña como nombre, objetivo y mensaje.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center -mt-5">
          <CustomButton
            texto="Empezar"
            ruta="/tutorial/Empresa"
            tipo="terciario"
            extraClases="bg-[#0561F3] hover:bg-[#0c1f57] text-white font-bold py-2 px-4 rounded cursor-pointer hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Bienvenida;