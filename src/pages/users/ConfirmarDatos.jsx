import React from "react";
import { FaCheck } from "react-icons/fa";
import CustomButton from "../../components/CustomButton";
import { BsArrowLeft } from "react-icons/bs";

const ConfirmacionDatos = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-poppins flex flex-col">
      <div className="bg-[#0B2C63] text-white p-6">
        <h1 className="text-lg font-semibold">
          Por favor, confirme que los datos que ha capturado sean los correctos.
        </h1>
        <p className="text-sm">
          Esta información es importante para continuar con el análisis de tu
          campaña.
        </p>
      </div>

      <div className="flex justify-center items-center mt-12 space-x-10">
        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Empresa</p>
        </div>

        <div className="h-1 w-16 bg-green-600"></div>

        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Producto</p>
        </div>

        <div className="h-1 w-16 bg-green-600"></div>

        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Campaña</p>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-lg p-10 w-[90%] max-w-3xl text-center mt-10">
          <h2 className="text-3xl font-bold mb-10">
            ¿Estás seguro de tus Datos?
          </h2>
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 bg-[#0c1f57] rounded-full flex items-center justify-center">
                <FaCheck size={80} color="white"/>
            </div>
          </div>

          <div className="flex justify-between px-10">
            <CustomButton
              texto={<BsArrowLeft className="text-2xl" />}
              ruta="/users/Campana"
              extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md"
            />

            <CustomButton
              texto="Continuar"
              ruta="/users/resumen"
              extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionDatos;
