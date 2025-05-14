import { useState } from "react";
import GraficaTendencias from "../../components/GraficaTendencias";

const ResumenTendencias9 = () => {
  const [seleccionadas, setSeleccionadas] = useState([2, 4, 9]);

  const toggleTendencia = (id) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  return (
    <div className="ml-[280px] p-6">
      <h1 className="text-3xl font-bold mb-6">
        Sabritas/ Sabritas de limón / Menos sodio
      </h1>

      <div className="flex justify-between items-start gap-6 mb-6">
        {/* Gráfica */}
        <div className="bg-white rounded shadow p-4 h-[360px] w-[750px]">
          <GraficaTendencias seleccionadas={seleccionadas} />
        </div>

        {/* Checkboxes más centrados */}
        <div className="flex flex-col gap-3 mt-2 px-6"> {/* <-- Aquí está el cambio */}
          {Array.from({ length: 10 }, (_, i) => i + 1).map((id) => (
            <label key={id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={seleccionadas.includes(id)}
                onChange={() => toggleTendencia(id)}
              />
              <span className="font-medium text-sm">{`Tendencia ${id}`}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Análisis */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-bold text-lg mb-2">Análisis de tendencias</h2>
        <p>
          Como puedes ver la palabra más relevante durante el mes fue X, seguida
          de Y y Z. Proponemos que pongas especial atención en estas tres para
          promover tu estrategia de marketing ya que puede afectar
          significativamente la campaña.
        </p>
      </div>

      {/* Recomendaciones */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-bold text-lg mb-2">Recomendaciones</h2>
        <p>
          Como recomendación te sugerimos que en tu campaña implementes
          publicidad relacionada con la tendencia Y y que tu producto vea
          relacionado algo con la tendencia X siendo la principal.
        </p>
      </div>
    </div>
  );
};

export default ResumenTendencias9;
