/**
 * @file ProductoModal.jsx
 * @author Andrea Doce, Min Che Kim
 * @description Modal para crear o editar productos.
 *              Permite introducir detalles como nombre, categoría, descripción,
 *              público objetivo, estado e imagen del producto.
 */
import React, { useState, useEffect, useContext } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BsImage } from "react-icons/bs";
import { ContextoProducto } from "../context/ProveedorProducto";
import { LuMousePointerClick } from "react-icons/lu";
import Campo from "./Campo";
import { ContextoEmpresa } from "../context/ProveedorEmpresa";

/**
 * Modal para crear o editar productos
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {number|null} props.id_producto - ID del producto a editar (null para crear nuevo)
 * @param {Object} [props.producto] - Datos del producto a editar (opcional)
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Function} [props.onSave] - Función a ejecutar después de guardar (opcional)
 * @returns {JSX.Element} Modal con formulario para editar/crear producto
 */
const ProductoModal = ({ id_producto, onClose }) => {
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    publico: "",
    estado: "",
    imagen: null,
  });

  // Estado para guardar los datos originales del producto
  const [productoOriginal, setProductoOriginal] = useState(null);

  // Estado para rastrear qué campos específicos han cambiado
  const [cambios, setCambios] = useState({});

  const [mensaje, setMensaje] = useState(null);

  const [guardar, setGuardar] = useState(true);
  const [mostrarCampos, setMostrarCampos] = useState(true);

  const [cargando, setCargando] = useState(false);

  const { crearProducto, actualizarProducto } = useContext(ContextoProducto);
  
    const { empresa, obtenerDatosEmpresa } = useContext(ContextoEmpresa);

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    obtenerDatosEmpresa();
  }, [obtenerDatosEmpresa]);

  /**
   * Efecto para cargar los datos del producto cuando se edita uno existente
   */
  useEffect(() => {
    if (id_producto) {
      fetch(`http://127.0.0.1:8080/producto/${id_producto}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // Formatear datos
          const productoData = {
            nombre: data.nombre || "",
            categoria: data.categoria || "",
            descripcion: data.descripcion || "",
            publico: data.publico_objetivo || "",
            estado: data.estado ? "Continuado" : "Descontinuado",
            imagen: data.ruta_img || null,
          };

          // Guardar en form para edición
          setForm(productoData);

          // Guardar copia original para detectar cambios
          setProductoOriginal(productoData);

          // Resetear cambios
          setCambios({});
        })
        .catch((err) => {
          console.error("Error al cargar los datos del producto:", err);
        });
    }
  }, [id_producto]);

  /**
   * Efecto para limpiar las URL de objeto creadas para previsualización de imágenes
   */
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  /**
   * Maneja el cambio de imagen en el input de tipo file
   * Valida tamaño máximo y genera una vista previa de la imagen seleccionada
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio del input
   */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        setMensaje({
          tipo: "error",
          texto: "Error: La imagen no debe exceder los 5MB.",
        });
        return;
      }
      if (id_producto) {
        setGuardar(true);
      }
      setForm((prev) => ({ ...prev, imagen: file }));
      setCambios((prev) => ({ ...prev, imagen: true }));
      setImagePreview(file ? URL.createObjectURL(file) : undefined);
      setMensaje(null);
    }
  };

  /**
   * Crea un manejador de eventos para inputs que actualiza el estado y resetea mensajes de error
   *
   * @param {Function} setter - Función setState para actualizar el valor
   * @returns {Function} Manejador de eventos para el input
   */
  const handleInputChange = /*(setter) =>*/ (e) => {
    const { name, value } = e.target;

    // Actualizar el valor en el formulario
    setForm((prev) => ({ ...prev, [name]: value }));

    // Si se esta editando un producto, comparar con los datos originales
    if (id_producto && productoOriginal) {
      setCambios((prev) => ({
        ...prev,
        [name]: value !== productoOriginal[name],
      }));
    }

    // setter(e.target.value);
    setMensaje(null);
    if (id_producto) {
      setGuardar(true);
    }
  };

  /**
   * Maneja el envío del formulario, validando y guardando el producto
   *
   * @param {React.FormEvent} e - Evento de formulario
   */
  const handleGuardar = async (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    if (
      !form.nombre ||
      !form.categoria ||
      !form.descripcion ||
      !form.publico ||
      !form.estado ||
      !form.imagen
    ) {
      setMensaje({
        tipo: "error",
        texto: "Error: No se han completado todos los campos.",
      });
      return;
    }

    // Preparar objeto con datos del producto
    const productoActualizado = {
      // ...producto,
      nombre: form.nombre,
      categoria: form.categoria,
      descripcion: form.descripcion,
      publico_objetivo: form.publico,
      estado: form.estado === "Continuado" ? 1 : 0,
      id_empresa: empresa.id_empresa,
      imagenFile: form.imagen instanceof File ? form.imagen : null,
    };

    //console.log(imagen)

    try {
      setCargando(true);

      if (!id_producto) {
        // Crear nuevo producto
        await crearProducto(productoActualizado);
        setMostrarCampos(false);
        setMensaje(null);
      } else {
        // Actualizar producto existente
        await actualizarProducto(id_producto, productoActualizado);
        setMensaje({
          tipo: "success",
          texto: "La información se ha guardado correctamente.",
        });

        // Actualizar original y resetear cambios
        setProductoOriginal(form);
        setCambios({});
      }

      setGuardar(false);
    } catch (error) {
      setMostrarCampos(true);
      // console.log("mostrarCampos", mostrarCampos);
      setMensaje({
        tipo: "error",
        texto:
          "Error al guardar el producto. Evite utilizar caracteres especiales. (< > ' \" ; ` % \\)",
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      {" "}
      {/*overflow-y-auto py-6*/}
      <div className="relative bg-white p-8 rounded shadow max-w-3xl w-full max-h-[100vh] overflow-y-auto my-auto">
        {" "}
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>
        {/* Título del modal */}
        <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">
          {id_producto ? "Editar producto" : "Agregar producto nuevo"}
        </h2>
        {/* Mensajes de error o éxito */}
        {mensaje && mostrarCampos && (
          <div
            className={`flex items-center gap-2 mb-4 px-4 py-3 rounded ${
              mensaje.tipo === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {mensaje.tipo === "error" ? (
              <FaTimesCircle className="text-red-500" />
            ) : (
              <FaCheckCircle className="text-green-500" />
            )}
            <span
              className={
                id_producto ? "text-sm font-medium" : "text-sm font-medium"
              }
            >
              {mensaje.texto}
            </span>
          </div>
        )}
        {/* Vista de formulario o mensaje de éxito */}
        {mostrarCampos ? (
          <form onSubmit={handleGuardar}>
            {/* Campos de nombre y categoría */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Campo
                  label="Nombre"
                  name="nombre"
                  valor={form.nombre}
                  editable={true}
                  cambio={cambios.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="categoria" className="block mb-2 font-medium">
                  Categoría(s):
                </label>
                <select
                  // required
                  id="categoria"
                  name="categoria"
                  value={form.categoria}
                  onChange={handleInputChange}
                  className={`border-2 p-2 rounded-[5px] w-full focus:outline-none transition-colors duration-200
    ${
      cambios.categoria
        ? "[border-color:#02245a] bg-blue-50"
        : "border-neutral-400 bg-white"
    }
  `}
                >
                  {/* Lista de opciones de categorías */}
                  <option value="" disabled>
                    Seleccione una categoría
                  </option>
                  <option value="Accesorios de moda">Accesorios de moda</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Artículos promocionales">
                    Artículos promocionales
                  </option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Calzado">Calzado</option>
                  <option value="Cosméticos">Cosméticos</option>
                  <option value="Decoración para el hogar">
                    Decoración para el hogar
                  </option>
                  <option value="Dispositivos médicos">
                    Dispositivos médicos
                  </option>
                  <option value="Electrodomésticos">Electrodomésticos</option>
                  <option value="Electrónicos">Electrónicos</option>
                  <option value="Gadgets tecnológicos">
                    Gadgets tecnológicos
                  </option>
                  <option value="Herramientas y equipos">
                    Herramientas y equipos
                  </option>
                  <option value="Higiene personal">Higiene personal</option>
                  <option value="Juguetes">Juguetes</option>
                  <option value="Libros y material educativo">
                    Libros y material educativo
                  </option>
                  <option value="Materiales de construcción">
                    Materiales de construcción
                  </option>
                  <option value="Medicamentos">Medicamentos</option>
                  <option value="Muebles">Muebles</option>
                  <option value="Papelería y oficina">
                    Papelería y oficina
                  </option>
                  <option value="Prendas de vestir">Prendas de vestir</option>
                  <option value="Productos artesanales">
                    Productos artesanales
                  </option>
                  <option value="Productos de limpieza">
                    Productos de limpieza
                  </option>
                  <option value="Productos deportivos">
                    Productos deportivos
                  </option>
                  <option value="Productos ecológicos">
                    Productos ecológicos
                  </option>
                  <option value="Productos infantiles">
                    Productos infantiles
                  </option>
                  <option value="Productos para mascotas">
                    Productos para mascotas
                  </option>
                  <option value="Refacciones y autopartes">
                    Refacciones y autopartes
                  </option>
                  <option value="Software y aplicaciones">
                    Software y aplicaciones
                  </option>
                  <option value="Suplementos alimenticios">
                    Suplementos alimenticios
                  </option>
                  <option value="Vehículos">Vehículos</option>
                </select>
              </div>
            </div>

            {/* Campo de descripción */}
            <div className="mb-4">
              <Campo
                label="Descripcion"
                name="descripcion"
                valor={form.descripcion}
                editable={true}
                cambio={cambios.descripcion}
                onChange={handleInputChange}
              />
            </div>

            {/* Campos de público objetivo y estado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Campo
                  label="Público objetivo"
                  name="publico"
                  valor={form.publico}
                  editable={true}
                  cambio={cambios.publico}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Estado:</label>
                <select
                  // required
                  id="estado"
                  name="estado"
                  value={form.estado}
                  onChange={handleInputChange}
                  className={`border-2 p-2 rounded-[5px] w-full focus:outline-none transition-colors duration-200
    ${
      cambios.estado
        ? "[border-color:#02245a] bg-blue-50"
        : "border-neutral-400 bg-white"
    }
  `}
                >
                  <option value="" disabled>
                    Seleccione
                  </option>
                  <option>Continuado</option>
                  <option>Descontinuado</option>
                </select>
              </div>
            </div>

            {/* Selector de imagen con vista previa */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Imagen de producto:
              </label>
              {form.imagen ? (
                <div>
                  <label
                    htmlFor="imagen"
                    className={`border-2 border-dashed rounded p-6 text-center cursor-pointer flex flex-col items-center justify-center text-gray-500 transition
                      ${
                        cambios.imagen && id_producto
                          ? "[border-color:#02245a] bg-blue-50 hover:bg-blue-100"
                          : "border-neutral-400 bg-white hover:bg-gray-50"
                      }`}
                  >
                    <input
                      type="file"
                      id="imagen"
                      name="imagen"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />

                    <img
                      src={imagePreview || form.imagen}
                      alt={`Imagen del producto ${form.nombre}`}
                      className="w-30 h-30 object-contain mb-2 rounded"
                    />
                    <span className="flex items-center gap-1 justify-center">
                      <LuMousePointerClick /> Cambiar imagen
                    </span>
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="imagen"
                  className="border-2 border-dashed border-gray-400 rounded p-6 text-center cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                >
                  <BsImage className="text-4xl mb-2" />
                  <span>+ Añadir imagen</span>
                  <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}

              {form.imagen && (
                <p className="text-sm text-gray-600 mt-2 italic">
                  Imagen seleccionada:{" "}
                  {typeof form.imagen === "string"
                    ? form.imagen
                    : form.imagen.name}
                </p>
              )}
            </div>

            {/* Botones de acción */}
            <div className="mt-6 flex justify-center">
              {guardar ? (
                <button
                  type="submit"
                  disabled={
                    cargando ||
                    (!Object.values(cambios).some(Boolean) && id_producto)
                  }
                  className={`bg-blue-800 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md text-sm transition ${
                    cargando ||
                    (!Object.values(cambios).some(Boolean) && id_producto)
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
                      {id_producto ? "Guardando..." : "Creando producto..."}
                    </span>
                  ) : (
                    "Guardar"
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={onClose}
                  className="bg-blue-800 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md text-sm transition"
                >
                  Cerrar
                </button>
              )}
            </div>
          </form>
        ) : (
          /* Mensaje de éxito después de crear producto */
          <div className="text-center py-8">
            <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
            <p className="text-lg font-medium mb-6">¡Producto creado!</p>
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

export default ProductoModal;
