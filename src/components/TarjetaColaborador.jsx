import React from "react";

const TarjetaColaborador = ({ nombre, correo, puesto, imagen }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 text-center hover:scale-105 transition-all">
      <img
        src={imagen}
        alt={nombre}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-300"
      />
      <h2 className="text-lg font-bold">{nombre}</h2>
      <p className="text-sm text-gray-600">{correo}</p>
      <p className="text-sm text-gray-500 mt-2">{puesto}</p>
    </div>
  );
};

export default TarjetaColaborador;
