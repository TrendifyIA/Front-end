import React, { useState } from 'react';
import { LuPencil } from "react-icons/lu";

function PreguntaPopup({ onClose, pregunta, onSave }) {
  const [titulo, setTitulo] = useState(pregunta?.texto || '');
  const [tipoRespuesta, setTipoRespuesta] = useState(pregunta?.tipoRespuesta || 'Opción múltiple');
  const [opcionesRespuesta, setOpcionesRespuesta] = useState(pregunta?.opcionesRespuesta || 'Sí, No, Tal vez');

  const Guardar = () => {
    onSave({
      texto: titulo,
      tipoRespuesta,
      opcionesRespuesta
    });
  };

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center gap-2 border rounded-md px-2 py-1 mb-6">
            <LuPencil className="text-gray-700" />
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="flex-1 font-bold text-xl focus:outline-none bg-transparent"
            />
        </div>

        <div className="mb-4">
          <label className="block text-md font-medium mb-1">Tipo de respuesta: </label>
          <select
            value={tipoRespuesta}
            onChange={(e) => setTipoRespuesta(e.target.value)}
            className="w-full border rounded px-3 py-2 shadow-sm focus:outline-none"
          >
            <option>Opción múltiple</option>
            <option>Escala de Likert</option>
            <option>Pregunta de Si/No</option>
            <option>Rango numérico</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-md font-medium mb-1">Opciones de respuesta:</label>
          <select
            value={opcionesRespuesta}
            onChange={(e) => setOpcionesRespuesta(e.target.value)}
            className="w-full border rounded px-3 py-2 shadow-sm focus:outline-none"
          >
            <option>"Muy satisfecho", "Satisfecho", "Neutral", "Insatisfecho", "Muy insatisfecho"</option>
            <option>Escala Likert ("Totalmente en desacuerdo", "En desacuerdo", "Neutral", "De acuerdo", "Totalmente de acuerdo")</option>
            <option>Sí, No, Tal vez</option>
            <option>Rango numérico (1-5, 1-10)</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-blue-900 text-blue-900 rounded hover:bg-blue-50"> Cancelar 
          </button>
          <button
            onClick={Guardar}
            className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">Agregar Pregunta
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreguntaPopup;