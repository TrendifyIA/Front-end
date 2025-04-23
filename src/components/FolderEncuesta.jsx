import React, { useState, useEffect } from 'react';
import { GoKebabHorizontal } from "react-icons/go";
import PreguntaPopup from './PreguntaPopup'; 
import { LuPencil } from 'react-icons/lu';

function FolderEncuesta({ encuestaInicial, onTerminarEncuesta }) {
  const [titulo, setTitulo] = useState(encuestaInicial.titulo);
  const [preguntas, setPreguntas] = useState(encuestaInicial.preguntas || []);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(null);

  const agregarPregunta = () => {
    setPreguntas([...preguntas, {
      texto: 'Nueva Pregunta',
      tipoRespuesta: 'Opción múltiple',
      opcionesRespuesta: 'Sí, No, Tal vez'
    }]);
  };

  const abrirPopup = (idx) => {
    setPreguntaSeleccionada(idx);
    setMostrarPopup(true);
  };

  const cerrarPopup = () => {
    setMostrarPopup(false);
    setPreguntaSeleccionada(null);
  };

  const actualizarPregunta = (nuevaPregunta) => {
    const actualizadas = [...preguntas];
    actualizadas[preguntaSeleccionada] = nuevaPregunta;
    setPreguntas(actualizadas);
    cerrarPopup();
  };

  const terminarEncuesta = () => {
    const ahora = new Date();
    const fechaActualizada = ahora.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }); 
  
    onTerminarEncuesta({
      ...encuestaInicial,
      titulo,
      preguntas,
      ultimaModificacion: fechaActualizada
    });
  };
  

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10 px-4">
      <div className="flex items-center mb-6 border-b-2 rounded px-3 py-2">
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="flex-1 text-3xl font-bold focus:outline-none bg-transparent"
        />
        <div className="text-3xl"> 
          <LuPencil />
        </div>
      </div>

      <div className="bg-white w-full max-w-2xl rounded-lg shadow-md p-4 mb-6">
        {preguntas.map((pregunta, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b py-3 text-lg"
          >
            <span>{pregunta.texto}</span>
            <button 
              className="text-gray-600 hover:text-black" 
              onClick={() => abrirPopup(idx)}
            >
              <GoKebabHorizontal />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-start w-full max-w-2xl mb-4">
        <button
          onClick={agregarPregunta}
          className="px-4 py-2 border border-blue-900 text-blue-900 rounded hover:bg-blue-50 text-sm"
        >
          Agregar Pregunta
        </button>
      </div>

      <button
        onClick={terminarEncuesta}
        className="px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800"
      >
        Terminar Encuesta
      </button>

      {mostrarPopup && (
        <PreguntaPopup
          onClose={cerrarPopup}
          pregunta={preguntas[preguntaSeleccionada]}
          onSave={actualizarPregunta}
        />
      )}
    </div>
  );
}

export default FolderEncuesta;