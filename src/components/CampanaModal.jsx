/**
 * @file CampanaModal.jsx
 * @author Andrea Doce, Min Che Kim
 * @description Modal para crear o editar campañas de marketing.
 *              Permite introducir detalles como nombre, objetivo, presupuesto y fechas.
 */
import { useContext, useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ContextoCampana } from "../context/ProveedorCampana";
import Campo from "./Campo";

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
  const [mensaje, setMensaje] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    objetivo: "",
    mensajeClave: "",
    canales: "",
    fechaInicio: "",
    fechaFinal: "",
    presupuesto: "",
  });

  const [guardar, setGuardar] = useState(true);
  const [mostrarCampos, setMostrarCampos] = useState(true);
  const [cargando, setCargando] = useState(false);  

  // Estado para guardar la campaña original (para comparar cambios)
  const [campanaOriginal, setCampanaOriginal] = useState(null);

  // Estado para rastrear qué campos específicos han cambiado
  const [cambios, setCambios] = useState({});

  const { crearCampana, actualizarCampana } = useContext(ContextoCampana);

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
          // Formatear datos
          const campanaData = {
            nombre: data.nombre || "",
            objetivo: data.objetivo || "",
            mensajeClave: data.mensaje_clave || "",
            canales: data.canales_distribucion || "",
            fechaInicio: formatDateForInput(data.f_inicio) || "",
            fechaFinal: formatDateForInput(data.f_fin) || "",
            presupuesto: data.presupuesto || "",
          };

          // Guardar en form para edición
          setForm(campanaData);

          // Guardar copia original para detectar cambios
          setCampanaOriginal(campanaData);

          // Resetear cambios
          setCambios({});
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Actualizar el valor en el formulario
    setForm((prev) => ({ ...prev, [name]: value }));

    // Si estamos editando, comparar con el valor original
    if (id_campana && campanaOriginal) {
      let isChanged = false;

      // Para el campo presupuesto, realizar una comparación numérica normalizada
      if (name === "presupuesto") {
        // Convertir ambos valores a números con la misma precisión
        const currentValue = parseFloat(value) || 0;
        const originalValue = parseFloat(campanaOriginal[name]) || 0;

        // Comparar con una pequeña tolerancia para números flotantes
        isChanged = Math.abs(currentValue - originalValue) > 0.001;

      } else {
        // Para otros campos, comparación normal
        isChanged = value !== campanaOriginal[name];
      }

      setCambios((prev) => ({ ...prev, [name]: isChanged }));
    }

    // Resetear mensajes de error
    setMensaje(null);

    // Siempre habilitamos el botón de guardar en modo edición
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
      !form.nombre ||
      !form.objetivo ||
      !form.mensajeClave ||
      !form.canales ||
      !form.fechaInicio ||
      !form.fechaFinal ||
      !form.presupuesto
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
      nombre: form.nombre,
      objetivo: form.objetivo,
      mensaje_clave: form.mensajeClave,
      canales_distribucion: form.canales,
      f_inicio: form.fechaInicio,
      f_fin: form.fechaFinal,
      presupuesto: form.presupuesto,
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
        // console.log("id producto:", idProducto);
        setMensaje({
          tipo: "success",
          texto: "La información se ha guardado correctamente.",
        });

        // Actualizar original y resetear cambios
        setCampanaOriginal(form);
        setCambios({});
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
      <div className="relative bg-white p-8 rounded-2xl shadow-xl max-w-3xl w-full max-h-[100vh] overflow-y-auto my-auto">
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
              <Campo
                label="Nombre"
                name="nombre"
                valor={form.nombre}
                editable={true}
                cambio={cambios.nombre}
                onChange={handleInputChange}
              />
              <Campo
                label="Objetivo"
                name="objetivo"
                valor={form.objetivo}
                editable={true}
                cambio={cambios.objetivo}
                onChange={handleInputChange}
              />
            </div>

            {/* Campo de mensaje clave */}
            <div className="mb-4">
              <Campo
                label="Mensaje clave"
                name="mensajeClave"
                valor={form.mensajeClave}
                editable={true}
                cambio={cambios.mensajeClave}
                onChange={handleInputChange}
              />
            </div>

            {/* Campo de canales */}
            <div className="mb-4">
              <Campo
                label="Canales de distribución"
                name="canales"
                valor={form.canales}
                editable={true}
                cambio={cambios.canales}
                onChange={handleInputChange}
              />
            </div>

            {/* Campos de fechas y presupuesto */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Campo
                  label="Fecha de inicio"
                  name="fechaInicio"
                  valor={form.fechaInicio}
                  editable={true}
                  cambio={cambios.fechaInicio}
                  onChange={handleInputChange}
                  type="date"
                />
              </div>
              <div>
                <Campo
                  label="Fecha de final"
                  name="fechaFinal"
                  valor={form.fechaFinal}
                  editable={true}
                  cambio={cambios.fechaFinal}
                  onChange={handleInputChange}
                  type="date"
                />
              </div>
              <div>
                <Campo
                  label="Presupuesto"
                  name="presupuesto"
                  valor={form.presupuesto}
                  editable={true}
                  cambio={cambios.presupuesto}
                  onChange={handleInputChange}
                  type="number"
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="mt-6 flex justify-center">
              {guardar ? (
                <button
                  type="submit"
                  disabled={cargando || !Object.values(cambios).some(Boolean) && id_campana}
                  className={`bg-blue-800 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md text-sm transition ${
                    cargando || !Object.values(cambios).some(Boolean) && id_campana
                      ? "opacity-70 cursor-not-allowed"
                      : ""
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
                      {id_campana ? "Guardando..." : "Creando campaña..."}
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
