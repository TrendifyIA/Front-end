import React from "react";
import { FiMail } from "react-icons/fi";
import { useEffect } from "react";

const RecoverPassword = () => {
  useEffect(() => {
    document.title = "Recuperar contraseña - Trendify";
  }, []);

  return (
    <div className="w-screen h-screen bg-[#0A2472] flex flex-col">
      <header className="p-6">
        <h1 className="text-white font-bold text-2xl">Trendify</h1>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-10 w-[450px]">
          <h2 className="text-2xl font-bold text-center mb-2">
            Recuperar contraseña
          </h2>
          <p className="text-center text-sm text-gray-700 mb-6">
            Ingresa el correo que registraste en tu cuenta, te enviaremos un
            código de verificación para que puedas ingresar
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Correo Electrónico"
              className="border-2 border-gray-300 rounded-md p-3 w-full pl-10 text-sm focus:outline-none focus:border-blue-500"
            />
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md p-2 mt-6 w-full">
            Enviar
          </button>
        </div>
      </main>
    </div>
  );
};

export default RecoverPassword;
