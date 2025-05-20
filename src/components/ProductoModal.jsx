import React, { useState } from "react";
import { BsBoxSeam, BsArrowLeft, BsArrowRight, BsImage } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { RiMegaphoneLine } from "react-icons/ri";
import CustomButton from "../../components/CustomButton";

const ProductoModal = ({ onClose }) => {
  return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
        <div className="relative bg-white p-8 rounded shadow max-w-3xl w-full">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl">
            ✕
            </button>

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
              <select required className="w-full border rounded px-3 py-2">
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

        </form>
      </div>
    </div>
  );
};


export default ProductoModal;
