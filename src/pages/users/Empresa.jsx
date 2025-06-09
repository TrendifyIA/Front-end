/**
 * @file Empresa.jsx
 * @author Jennyfer Jasso, Yael Pérez
 * @description Página de información de la empresa y permite editar la información registrada de la empresa asociada al usuario.
 */
import { useState, useEffect, useContext } from "react";
import CustomButton from "../../components/CustomButton";
import Campo from "../../components/Campo";
import { ContextoEmpresa } from "../../context/ProveedorEmpresa";
import { FaPencilAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

/**
 * Componente que muestra y permite editar los datos de la empresa asociada al usuario.
 * Incluye manejo de edición, guardado, cancelación y mensajes de éxito/error.
 *
 * @returns {JSX.Element} Página de información editable de la empresa.
 */
const Empresa = () => {
  const { empresa, obtenerDatosEmpresaUsuario, modificarEmpresa } =
    useContext(ContextoEmpresa);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState(null);
  const [cambios, setCambios] = useState({});
  const [mensaje, setMensaje] = useState(null);

  // Obtener los datos de la empresa del usuario
  useEffect(() => {
    const id_usuario = localStorage.getItem("id_usuario");
    if (id_usuario) {
      obtenerDatosEmpresaUsuario(id_usuario);
    }
  }, [obtenerDatosEmpresaUsuario]);

  // Actualiza el formulario local con los datos de la empresa cuando se obtienen
  useEffect(() => {
    if (empresa) {
      setForm(empresa);
    }
  }, [empresa]);

  // Limpia el mensaje de éxito o error después de 5 segundos
  useEffect(() => {
    if (mensaje) {
      const timeout = setTimeout(() => {
        setMensaje(null);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [mensaje]);

  //Muestra un mensaje de carga
  if (!empresa || !form) return <p className="p-10">Cargando empresa...</p>;

  /**
   * Maneja los cambios de los campos del formulario.
   * Marca como modificado si el nuevo valor es diferente del original.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setCambios((prev) => ({ ...prev, [name]: value !== empresa[name] }));
  };

  /**
   * Guarda los cambios realizados en la empresa. Notifica el resultado al usuario.
   */
  const guardar = async () => {
    const exito = await modificarEmpresa(empresa.id_empresa, form);
    try {
      const exito = await modificarEmpresa(empresa.id_empresa, form);
      if (exito) {
        setEditando(false);
        setCambios({});
        setMensaje({
          tipo: "success",
          texto: "La información se ha modificado correctamente.",
        });
      } else {
        setMensaje({
          tipo: "error",
          texto: "Ocurrió un error al modificar la información.",
        });
      }
    } catch (error) {
      setMensaje({
        tipo: "error",
        texto: `Error inesperado: ${error.message}`,
      });
    }
  };

  /**
   * Cancela la edición y revierte los cambios.
   */
  const cancelar = async () => {
    setEditando(false);
    setForm(empresa);
    setCambios({});
  };

  return (
    <div className="flex flex-col gap-5 w-full p-10">
      <h1 className="text-4xl font-bold flex items-center gap-2">
        Empresa
        {!editando && (
          <FaPencilAlt
            className="text-blue-500 hover:text-blue-300 cursor-pointer text-base relative top-[-6px]"
            onClick={() => setEditando(true)}
          />
        )}
      </h1>
      <p className="w-[1000px]">
        En este apartado encontrarás la información actual registrada de tu
        empresa. Si detectas algún dato que requiera actualización, puedes
        editarlo con total confianza para mantenerla al día.
      </p>

      {/* Mensaje de éxito o error */}
      {mensaje && (
        <div
          className={`flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-300 w-[1000px] ${
            mensaje.tipo === "error"
              ? "bg-red-200 text-red-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {mensaje.tipo === "error" ? (
            <FaTimesCircle className="text-red-500 text-lg" />
          ) : (
            <FaCheckCircle className="text-green-500 text-lg" />
          )}
          <span className="text-sm font-medium">{mensaje.texto}</span>
          <button
            onClick={() => setMensaje(null)}
            className="text-xl font-bold hover:text-black focus:outline-none ml-auto"
            style={{ lineHeight: 1 }}
          >
            ×
          </button>
        </div>
      )}

      {/* Información/formulario de empresa */}
      <div className="bg-white shadow-md rounded-2xl p-7 w-[1000px]">
        <div className="flex flex-row gap-2 w-full items-stretch">
          <div className="flex flex-col gap-2 mb-4 w-1/2 h-full">
            <Campo
              label="Nombre"
              valor={form.nombre}
              name="nombre"
              editable={editando}
              cambio={cambios.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mb-4 w-1/2 h-full">
            {editando ? (
              <>
                <label htmlFor="nicho" className="font-medium mb-2 block">
                  Sector de mercado:
                </label>
                <select
                  required
                  id="nicho"
                  name="nicho"
                  value={form.nicho}
                  onChange={handleChange}
                  className={`border-2 p-2 rounded-[5px] w-full focus:outline-none transition-colors duration-200
    ${
      cambios.nicho
        ? "[border-color:#02245a] bg-blue-50"
        : "border-neutral-400 bg-white"
    }
  `}
                >
                  <option value="">Selecciona un sector</option>
                  <option value="Moda y belleza">Moda y belleza</option>
                  <option value="Alimentos y bebidas">
                    Alimentos y bebidas
                  </option>
                  <option value="Salud y bienestar">Salud y bienestar</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Educación">Educación</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Hogar y decoración">Hogar y decoración</option>
                  <option value="Entretenimiento">Entretenimiento</option>
                </select>
              </>
            ) : (
              <Campo
                label="Segmento de mercado"
                valor={form.nicho}
                name="nicho"
                editable={false}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
          <Campo
            label="Dirección física"
            valor={form.direccion}
            name="direccion"
            editable={editando}
            cambio={cambios.direccion}
            onChange={handleChange}
            // multiline
          />
        </div>

        <div className="flex flex-row gap-2 w-full items-stretch">
          <div className="flex flex-col gap-2 mb-4 w-1/2 h-full">
            <Campo
              label="Propuesta de valor"
              valor={form.propuesta_valor}
              name="propuesta_valor"
              editable={editando}
              cambio={cambios.propuesta_valor}
              onChange={handleChange}
              multiline
            />
          </div>
          <div className="flex flex-col gap-2 mb-4 w-1/2 h-full">
            <Campo
              label="Descripción de servicios/productos"
              valor={form.descripcion_servicio}
              name="descripcion_servicio"
              editable={editando}
              cambio={cambios.descripcion_servicio}
              onChange={handleChange}
              multiline
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
          <Campo
            label="Competidores"
            valor={form.competidores}
            name="competidores"
            editable={editando}
            cambio={cambios.competidores}
            onChange={handleChange}
            // multiline
          />
        </div>
        {/* Botones para guardar o cancelar la edición */}
        <div className="w-full flex justify-center gap-4">
          {editando && (
            <>
              <CustomButton texto="Cancelar" tipo="cancel" onClick={cancelar} />
              <CustomButton texto="Guardar" tipo="primario" onClick={guardar} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Empresa;
