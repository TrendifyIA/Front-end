import React from "react";

const CodigoEquipo = () => {
  return (
    <div class="min-h-screen bg-[#0c1f57] flex flex-col font-family">
      <header class="p-6">
        <h1 class="text-white text-2xl font-bold">Trendify</h1>
      </header>

      <div class="flex flex-1 items-center justify-center">
        <div class="bg-white p-12 rounded-lg shadow-lg text-center w-[95%] max-w-xl">
          <h2 class="text-3xl font-bold mb-4">Ingresa código de equipo</h2>
          <p class="text-gray-600 mb-8 text-base">
            Tu administrador ha generado un código de equipo, ingresalo a
            continuación.
          </p>

          <div class="flex justify-center gap-3">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                maxLength={1}
                class="w-14 h-16 text-center rounded-md bg-gray-300 text-xl text-black outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodigoEquipo;
