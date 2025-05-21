import React from "react";
import { BsBoxSeam, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { BsImage } from "react-icons/bs";
import { RiMegaphoneLine } from "react-icons/ri";
import CustomButton from "../../components/CustomButton";


const Producto = () => {

  return (
    <div className="bg-gray-100 min-h-screen font-sans">

      <div className="bg-[#0B2C63] text-white p-6">
        <h1 className="text-lg font-semibold">
          Por favor, complete los siguientes campos para registrar el producto que se desea analizar.
        </h1>
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
          <div className="border-4 border-[#0B2C63] text-[#0B2C63] rounded-full p-3 text-xl bg-white">
            <BsBoxSeam />
          </div>
          <p className="mt-2 text-sm font-medium text-[#0B2C63]">Producto</p>
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
        <h2 className="text-4xl font-bold mb-6">Producto</h2>

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Nombre:</label>
              <input required className="w-full border rounded px-3 py-2" type="text" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Categoría(s):</label>
              <select required className="w-full border rounded px-3 py-2 cursor-pointer">
                <option value="">Seleccione</option>
                <option>Alimentos</option>
                <option>Tecnología</option>
                <option>Ropa</option>
                <option>Autos</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Descripción:</label>
            <input required className="w-full border rounded px-3 py-2" type="text" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Público objetivo:</label>
              <input required className="w-full border rounded px-3 py-2" type="text" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Estado:</label>
              <select required className="w-full border rounded px-3 py-2 cur">
                <option value="">Seleccione</option>
                <option>Continuado</option>
                <option>Descontinuado</option>
              </select>
            </div>
          </div>

        <div className="mb-6">
        <label className="block mb-2 font-medium">Imagen de producto:</label>
        
        <label
            htmlFor="imagen"
            className="border-2 border-dashed border-gray-400 rounded p-6 text-center cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition"
        >
            <BsImage className="text-4xl mb-2" />
            <span>+ Añadir imagen</span>
            <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
                const fileName = e.target.files?.[0]?.name;
                if (fileName) {
                document.getElementById("nombre-imagen").textContent = `Imagen seleccionada: ${fileName}`;
                }
            }}
            />
        </label>

        <p id="nombre-imagen" className="text-sm text-gray-600 mt-2 italic"></p>
        </div>

          <div className="flex justify-between px-10">
            <CustomButton
              texto={<BsArrowLeft className="text-2xl" />}
              ruta="/tutorial/Empresa"
              extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md"
            />

            <CustomButton
              texto={<BsArrowRight className="text-2xl" />}
              ruta="/tutorial/Campana"
              extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md"
            />
            </div>
        </form>
      </div>
    </div>
  );
};

export default Producto;
