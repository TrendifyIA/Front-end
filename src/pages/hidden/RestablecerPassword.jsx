import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
  // TODO: Implementar la lógica para restablecer la contraseña

  useEffect(() => {
    document.title = "Restablece tu contraseña - Trendify";
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="w-screen h-screen bg-[#0A2472] flex flex-col">
      <header className="p-6">
        <h1 className="text-white font-bold text-2xl">Trendify</h1>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-10 w-[450px]">
          <h2 className="text-2xl font-bold text-center mb-2">
            Restablece tu contraseña
          </h2>
          <p className="text-center text-sm text-gray-700 mb-6">
            Ingresa una nueva contraseña para entrar a tu cuenta.
          </p>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="border-2 border-gray-300 rounded-md p-3 w-full pl-4 pr-10 text-sm focus:outline-none focus:border-blue-500"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirma contraseña"
              className="border-2 border-gray-300 rounded-md p-3 w-full pl-4 pr-10 text-sm focus:outline-none focus:border-blue-500"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md p-2 mt-6 w-full">
            Enviar
          </button>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
