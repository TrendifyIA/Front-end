/**
 * @file CampanaModal.jsx
 * @author Andrea Doce, Min Che Kim
 * @description Modal para crear o editar campañas de marketing.
 *              Permite introducir detalles como nombre, objetivo, presupuesto y fechas.
 */
import { useContext, useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { CampanaContext } from "../context/ProveedorCampana";

/**
 * Modal para crear o editar campañas
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {number|null} props.id_campana - ID de la campaña a editar (null para crear nueva)
 * @param {number} props.idProducto - ID del producto asociado a la campaña
 * @param {Object} [props.producto] - Información del producto relacionado (opcional)
 * @param {Object} [props.campana] - Datos de la campaña a editar (opcional)
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Function} [props.onSave] - Función a ejecutar después de guardar (opcional)
 * @param {Function} [props.onNuevaCampana] - Función para manejar nueva campaña (opcional)
 * @returns {JSX.Element} Modal con formulario para editar/crear campaña
 */
const CampanaModal = ({ id_campana, idProducto, campana, onClose }) => {
  const [nombre, setNombre] = useState(campana?.nombre || "");
  const [objetivo, setObjetivo] = useState(campana?.objetivo || "");
  const [mensajeClave, setMensajeClave] = useState(campana?.mensajeClave || "");
  const [canales, setCanales] = useState(campana?.canales || "");
  const [fechaInicio, setFechaInicio] = useState(campana?.fechaInicio || "");
  const [fechaFinal, setFechaFinal] = useState(campana?.fechaFinal || "");
  const [presupuesto, setPresupuesto] = useState(campana?.presupuesto || "");
  const [mensaje, setMensaje] = useState(null);

  const [guardar, setGuardar] = useState(true);
  const [mostrarCampos, setMostrarCampos] = useState(true);
  const [cargando, setCargando] = useState(false);

  const { crearCampana, actualizarCampana } = useContext(CampanaContext);

  // Función para convertir formato de fecha
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Fecha inválida

    // Formato YYYY-MM-DD para input type="date"
    return date.toISOString().split("T")[0];
  };

  /**
   * Efecto para cargar los datos de la campaña cuando se edita una existente
   */
  useEffect(() => {
    if (id_campana) {
      fetch(`http://127.0.0.1:8080/campana/campana/${id_campana}`)
        .then((res) => res.json())
        .then((data) => {
          setNombre(data.nombre || "");
          setObjetivo(data.objetivo || "");
          setMensajeClave(data.mensaje_clave || "");
          setCanales(data.canales_distribucion || "");
          setFechaInicio(formatDateForInput(data.f_inicio) || "");
          setFechaFinal(formatDateForInput(data.f_fin) || "");
          setPresupuesto(data.presupuesto || "");
          //console.log("Datos de campaña cargados:", data);
        })
        .catch((err) => {
          console.error("Error al cargar los datos de la campaña:", err);
        });
    }
  }, [id_campana]);

  /**
   * Maneja los cambios en los inputs y resetea mensajes de error
   *
   * @param {Function} setter - Función setState para actualizar el valor
   * @returns {Function} Manejador de eventos para el input
   */
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setMensaje(null);
    if (id_campana) {
      setGuardar(true);
    }
  };

  /**
   * Maneja el envío del formulario, validando y guardando la campaña
   *
   * @param {React.FormEvent} e - Evento de formulario
   */
  const handleGuardar = async (e) => {
    e.preventDefault();

    if (
      !nombre ||
      !objetivo ||
      !mensajeClave ||
      !canales ||
      !fechaInicio ||
      !fechaFinal ||
      !presupuesto
    ) {
      setMensaje({
        tipo: "error",
        texto: "Error: No se han completado todos los campos.",
      });
      return;
    }

    const nuevaCampana = {
      // ...campana,
      // id: campana?.id || crypto.randomUUID(),
      nombre,
      objetivo,
      mensaje_clave: mensajeClave,
      canales_distribucion: canales,
      f_inicio: fechaInicio,
      f_fin: fechaFinal,
      presupuesto,
      id_producto: idProducto,
    };

    try {
      setCargando(true);

      if (!id_campana) {
        await crearCampana(nuevaCampana);
        setMostrarCampos(false);
        setMensaje(null);
      } else {
        await actualizarCampana(id_campana, nuevaCampana);
        console.log("id producto:", idProducto);
        setMensaje({
          tipo: "success",
          texto: "La información se ha guardado correctamente.",
        });
      }

      setGuardar(false);
    } catch (error) {
      setMostrarCampos(true);
      setMensaje({
        tipo: "error",
        texto:
          "Error al guardar campaña. Evite utilizar caracteres especiales. (< > ' \" ; ` % \\)",
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-xl max-w-3xl w-full">
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold"
        >
          ✕
        </button>

        {/* Título del modal */}
        <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">
          {/*campana*/ id_campana ? "Editar campaña" : "Agregar nueva campaña"}
        </h2>

        {/* Mensajes de error o éxito */}
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

        {/* Vista de formulario o mensaje de éxito */}
        {mostrarCampos ? (
          <form onSubmit={handleGuardar}>
            {/* Campos de nombre y objetivo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  value={nombre}
                  onChange={handleInputChange(setNombre)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  type="text"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Objetivo
                </label>
                <input
                  value={objetivo}
                  onChange={handleInputChange(setObjetivo)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  type="text"
                />
              </div>
            </div>

            {/* Campo de mensaje clave */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Mensaje clave
              </label>
              <input
                value={mensajeClave}
                onChange={handleInputChange(setMensajeClave)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                type="text"
              />
            </div>

            {/* Campo de canales */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Canales de distribución
              </label>
              <input
                value={canales}
                onChange={handleInputChange(setCanales)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                type="text"
              />
            </div>

            {/* Campos de fechas y presupuesto */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Fecha de inicio
                </label>
                <input
                  value={fechaInicio}
                  onChange={handleInputChange(setFechaInicio)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  type="date"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Fecha final
                </label>
                <input
                  value={fechaFinal}
                  onChange={handleInputChange(setFechaFinal)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  type="date"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Presupuesto
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">
                    $
                  </span>
                  <input
                    value={presupuesto}
                    onChange={handleInputChange(setPresupuesto)}
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full border rounded-md pl-8 pr-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="mt-6 flex justify-center">
              {guardar ? (
                <button
                  type="submit"
                  disabled={cargando}
                  className={`bg-blue-800 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md text-sm transition ${
                    cargando ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {cargando ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creando campaña...
                    </span>
                  ) : (
                    "Guardar"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-blue-800 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md text-sm transition"
                >
                  Cerrar
                </button>
              )}
            </div>
          </form>
        ) : (
          /* Mensaje de éxito después de crear campaña */
          <div className="text-center py-8">
            <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
            <p className="text-lg font-medium mb-6">¡Campaña creada!</p>
            <button
              onClick={onClose}
              className="bg-blue-800 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampanaModal;
