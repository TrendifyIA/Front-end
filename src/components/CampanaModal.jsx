import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { RiMegaphoneLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import CustomButton from "../../components/CustomButton";

const CampanaModal = ({onClose}) => {
  return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
        <div className="relative bg-white p-8 rounded shadow max-w-3xl w-full">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl">
            ✕
            </button>
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
            <label className="block mb-1 font-medium">Canales de distribución:</label>
            <input required className="w-full border rounded px-3 py-2" type="text" />
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
            <div>
              <label className="block mb-1 font-medium">Presupuesto:</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">$</span>
                <input
                  required
                  type="text"
                  min="0"
                  className="w-full border rounded pl-8 pr-3 py-2"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampanaModal;
