import React from 'react';

const DetalleTendencia = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-[#00235B] text-white p-6">
        <h1 className="text-3xl font-bold mb-8">Trendify</h1>
        <nav className="space-y-4">
          <a href="#" className="block font-semibold">Empresa</a>
          <a href="#" className="block font-semibold">Productos</a>
          <a href="#" className="absolute bottom-6 left-6 font-semibold text-sm">Cerrar Sesión</a>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6">Sabritas/ Sabritas de limón / Menos sodio/ Tend1</h2>

        <div className="bg-white p-6 rounded shadow mb-6">
          <img src="https://via.placeholder.com/600x300" alt="Gráfica" className="w-full mb-4" />
          <div className="grid grid-cols-3 gap-4 text-sm">
            {["Facebook", "Instagram", "Reddit"].map((plataforma, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked={plataforma !== "Facebook"} />
                <span>{plataforma}</span>
              </label>
            ))}
          </div>
        </div>

        <section className="bg-white p-6 rounded shadow mb-6">
          <h3 className="font-bold mb-2">Análisis general de las tendencias</h3>
          <p>
            Tu campaña tiene mejor recepción en Instagram que en Reddit...
          </p>
        </section>

        <section className="bg-white p-6 rounded shadow">
          <h3 className="font-bold mb-2">Recomendaciones</h3>
          <p>
            Invierte un 10% más en Instagram y cambia la estrategia en Reddit...
          </p>
        </section>
      </main>
    </div>
  );
};

export default DetalleTendencia;
