import React from "react";
import { BsBuildings, BsBoxSeam, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { RiMegaphoneLine } from "react-icons/ri";
import CustomButton from "../../components/CustomButton";

const Empresa = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="bg-[#0B2C63] text-white p-6">
        <h1 className="text-lg font-semibold">
          Por favor, complete los siguientes campos para registrar su empresa.
        </h1>
        <p className="text-sm">
          Asegúrese de completar todos los campos para obtener resultados más precisos y útiles en el análisis.
        </p>
      </div>


      <div className="flex justify-center items-center my-12 space-x-8">
        <div className="flex flex-col items-center">
          <div className="border-4 border-[#0B2C63] text-[#0B2C63] rounded-full p-3 text-xl bg-white">
            <BsBuildings />
          </div>
          <p className="mt-2 text-sm font-medium text-[#0B2C63]">Empresa</p>
        </div>
        <div className="h-1 w-50 bg-gray-300"></div>
        <div className="flex flex-col items-center">
          <div className="border-4 border-gray-400 text-gray-400 rounded-full p-3 text-xl bg-white">
            <BsBoxSeam />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-400">Producto</p>
        </div>
        <div className="h-1 w-50 bg-gray-300"></div>
        <div className="flex flex-col items-center opacity-50">
          <div className="border-4 border-gray-400 text-gray-400 rounded-full p-3 text-xl bg-white">
            <RiMegaphoneLine />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-400">Campaña</p>
        </div>
      </div>

      <div className="bg-white mx-auto max-w-3xl p-8 rounded shadow">
        <h2 className="text-4xl font-bold mb-6">Empresa</h2>
        <form>
          <div className="flex flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 mb-4 w-1/2">
              <label htmlFor="nameCompany" className="font-medium">Nombre de la empresa:</label>
              <input
                required
                type="text"
                id="nameCompany"
                className="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"
              />
            </div>
            <div className="flex flex-col gap-2 mb-4 w-1/2">
              <label htmlFor="segment" className="font-medium">Segmento de mercado:</label>
              <select
                required
                id="segment"
                className="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400">
                <option value="">Selecciona uno o varios</option>
                <option value="1">Alimentos</option>
                <option value="2">Finanzas</option>
                <option value="3">Carros</option>
                <option value="4">Bicis</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="location" className="font-medium">Dirección física:</label>
            <input
              required
              type="text"
              id="location"
              className="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"/>
          </div>
          <div className="flex flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 mb-4 w-1/2">
              <label className="font-medium">Propuesta de valor:</label>
              <input
                required
                type="text"
                className="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"/>
            </div>
            <div className="flex flex-col gap-2 mb-4 w-1/2">
              <label className="font-medium">Público objetivo:</label>
              <input
                required
                type="text"
                className="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"/>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4 w-full">
            <label className="font-medium">Descripción de servicios/productos</label>
            <input
              required
              type="text"
              className="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"/>
          </div>
          <div className="flex flex-col gap-2 mb-4 w-full">
            <label className="font-medium">Competidores</label>
            <input
              required
              type="text"
              className="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"/>
          </div>
          
          <div className="flex justify-between px-10">
            <CustomButton
              texto={<BsArrowLeft className="text-2xl" />}
              ruta="/users/Bienvenida"
              extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md"
            />
            <CustomButton
              texto={<BsArrowRight className="text-2xl" />}
              ruta="/users/Producto"
              extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Empresa;