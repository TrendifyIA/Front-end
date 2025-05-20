// Campana.jsx
import React from "react";
import { BsBoxSeam, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { RiMegaphoneLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import CustomButton from "../../components/CustomButton";

const Campana = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">

      <div className="bg-[#0B2C63] text-white p-6">
        <h1 className="text-lg font-semibold">
          Por favor, complete los siguientes campos para registrar la campaña que se desea analizar.
        </h1>
        <p className="text-sm">
          La información ingresada permitirá identificar aspectos clave de la campaña y facilitará la detección de tendencias relevantes.
        </p>
        <p className="text-sm">
          Asegúrese de completar todos los campos para obtener resultados más precisos y útiles en el análisis.
        </p>
      </div>

      <div className="flex justify-center items-center my-12 space-x-8">
        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Empresa</p>
        </div>
        <div className="h-1 w-50 bg-green-600"></div>

        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Producto</p>
        </div>
        <div className="h-1 w-50 bg-green-600"></div>

        <div className="flex flex-col items-center">
          <div className="border-4 border-[#0B2C63] text-[#0B2C63] rounded-full p-3 text-xl bg-white">
            <RiMegaphoneLine />
          </div>
          <p className="mt-2 text-sm font-medium text-[#0B2C63]">Campaña</p>
        </div>
      </div>

      <div className="bg-white mx-auto max-w-3xl p-8 rounded shadow">
        <h2 className="text-4xl font-bold mb-6">Campaña</h2>

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Nombre:</label>
              <input required className="w-full border rounded px-3 py-2" type="text" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Objetivo:</label>
              <input required className="w-full border rounded px-3 py-2" type="text" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Mensaje clave:</label>
            <input required className="w-full border rounded px-3 py-2" type="text" />
          </div>

          <div className="mb-4">
            <div>
              <label className="block mb-1 font-medium">Canales de distribución:</label>
              <input required className="w-full border rounded px-3 py-2" type="text" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Fecha de inicio:</label>
              <input required className="w-full border rounded px-3 py-2" type="date" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Fecha final:</label>
              <input required className="w-full border rounded px-3 py-2" type="date" />
            </div>

            <div className="mb-6">
                <label className="block mb-1 font-medium">Presupuesto:</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">$</span>
                    <input required type="text" min="0" className="w-full border rounded pl-8 pr-3 py-2" placeholder="0.00"/>
                </div>
            </div>
          </div>

          <div className="flex justify-between px-10">
            <CustomButton
              texto={<BsArrowLeft className="text-2xl" />}
              ruta="/users/Producto"
              extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md"
            />

            <CustomButton
              texto={<BsArrowRight className="text-2xl" />}
              ruta="/users/confirmacion"
              extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md"
            />
            </div>
        </form>
      </div>
    </div>
  );
};

export default Campana;
