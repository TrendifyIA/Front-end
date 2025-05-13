import React from "react";
import SideBar from "../../components/SideBar";

const Perfil = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex">

      {/* Sidebar fijo */}
      <SideBar />
      
      <div className="flex-1 ml-[280px] p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi Perfil</h1>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-6">Información básica</h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    defaultValue="Henry"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    defaultValue="Paulista"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    defaultValue="Jefferson"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-800 mb-2">Información laboral</h3>
                  <input
                    type="text"
                    defaultValue="Director de Marketing"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    defaultValue="henry@gmail.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <button className="px-4 py-2 bg-primary-500 text-white hover:bg-primary-600 rounded-md text-sm font-medium hover:scale-105 cursor-pointer">
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-6">Suscripción</h2>
              <div className="text-center py-12 text-gray-500">
                <p>Información del plan aparecerá aquí</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;