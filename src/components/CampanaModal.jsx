import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const CampanaModal = ({ producto, campana, onClose, onSave, onNuevaCampana }) => {
  const [nombre, setNombre] = useState(campana?.nombre || "");
  const [objetivo, setObjetivo] = useState(campana?.objetivo || "");
  const [mensajeClave, setMensajeClave] = useState(campana?.mensajeClave || "");
  const [canales, setCanales] = useState(campana?.canales || "");
  const [fechaInicio, setFechaInicio] = useState(campana?.fechaInicio || "");
  const [fechaFinal, setFechaFinal] = useState(campana?.fechaFinal || "");
  const [presupuesto, setPresupuesto] = useState(campana?.presupuesto || "");
  const [mensaje, setMensaje] = useState(null);

  const handleGuardar = (e) => {
    e.preventDefault();

    if (!nombre || !objetivo || !mensajeClave || !canales || !fechaInicio || !fechaFinal || !presupuesto) {
      setMensaje({
        tipo: "error",
        texto: "Error: No se han completado todos los campos.",
      });
      return;
    }

    setMensaje({
      tipo: "success",
      texto: "La información se ha guardado correctamente.",
    });

    const nuevaCampana = {
      ...campana,
      id: campana?.id || crypto.randomUUID(),
      nombre,
      objetivo,
      mensajeClave,
      canales,
      fechaInicio,
      fechaFinal,
      presupuesto,
    };

    setTimeout(() => {
      setMensaje(null);
      if (campana) {
        onSave(nuevaCampana); // Editar campaña existente
      } else {
        onNuevaCampana(producto.id, nuevaCampana); // Nueva campaña
      }
      onClose(); // Cierra el modal
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-xl max-w-3xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">
          {campana ? "Editar campaña" : "Agregar nueva campaña"}
        </h2>

        {mensaje && (
          <div
            className={`flex items-center gap-2 mb-6 px-4 py-3 rounded-md ${
              mensaje.tipo === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {mensaje.tipo === "error" ? (
              <FaTimesCircle className="text-red-500 text-lg" />
            ) : (
              <FaCheckCircle className="text-green-500 text-lg" />
            )}
            <span className="text-sm font-medium">{mensaje.texto}</span>
          </div>
        )}

        <form onSubmit={handleGuardar}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Nombre</label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                type="text"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Objetivo</label>
              <input
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                type="text"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Mensaje clave</label>
            <input
              value={mensajeClave}
              onChange={(e) => setMensajeClave(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              type="text"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Canales de distribución</label>
            <input
              value={canales}
              onChange={(e) => setCanales(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              type="text"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Fecha de inicio</label>
              <input
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                type="date"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Fecha final</label>
              <input
                value={fechaFinal}
                onChange={(e) => setFechaFinal(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                type="date"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Presupuesto</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">$</span>
                <input
                  value={presupuesto}
                  onChange={(e) => setPresupuesto(e.target.value)}
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full border rounded-md pl-8 pr-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md text-sm transition"
            >
              Guardar campaña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampanaModal;
