import React from 'react';
import { FaFolderPlus } from 'react-icons/fa';

function Encuestas({ encuestas, onAgregarEncuesta, onEditarEncuesta }) {
  return (
    <div className="flex flex-col flex-1 bg-gray-100 p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Encuesta</h1>

      <div className="flex justify-center mb-8">
        <div
          className="text-center rounded-md cursor-pointer transition"
          onClick={onAgregarEncuesta}
        >
          <div className="text-9xl flex justify-center text-blue-900">
            <FaFolderPlus />
          </div>
          <p className="font-medium">Crear encuesta</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Mis encuestas</h2>

      <div className="flex gap-6 flex-wrap">
        {encuestas.map((encuesta) => (
          <div
            key={encuesta.id}
            className="relative w-52 h-48 cursor-pointer"
            onClick={() => onEditarEncuesta(encuesta.id)}
          >
            <img
              src="src/assets/images/folder.png"
              alt="Folder"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-0 w-full h-full p-3 text-white flex flex-col justify-center items-center">
              <h4 className="text-lg font-semibold text-center">{encuesta.titulo}</h4>
              <p className="text-sm text-center mt-2">
                Última modificación:<br />
                {encuesta.ultimaModificacion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Encuestas;