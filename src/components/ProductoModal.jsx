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
import { ProductoContext } from "../context/ProveedorProducto";
import { UsuarioContext } from "../context/ProveedorUsuario";
import { LuMousePointerClick } from "react-icons/lu";

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
const ProductoModal = ({ id_producto, producto, onClose, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [publico, setPublico] = useState("");
  const [estado, setEstado] = useState("");
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const [guardar, setGuardar] = useState(true);
  const [mostrarCampos, setMostrarCampos] = useState(true);

  const [cargando, setCargando] = useState(false);

  const { crearProducto, actualizarProducto } = useContext(ProductoContext);
  const { idEmpresa } = useContext(UsuarioContext);

  const [imagePreview, setImagePreview] = useState("");

  /**
   * Efecto para cargar los datos del producto cuando se edita uno existente
   */
  useEffect(() => {
    if (id_producto) {
      fetch(`http://127.0.0.1:8080/producto/${id_producto}`)
        .then((res) => res.json())
        .then((data) => {
          setNombre(data.nombre || "");
          setCategoria(data.categoria || "");
          setDescripcion(data.descripcion || "");
          setPublico(data.publico_objetivo || "");
          setEstado(data.estado ? "Procesado" : "Sin Procesar");
          setImagen(data.ruta_img || null);
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
      setImagen(file);
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
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
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
      !nombre ||
      !categoria ||
      !descripcion ||
      !publico ||
      !estado ||
      !imagen
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
      nombre,
      categoria,
      descripcion,
      publico_objetivo: publico,
      estado: estado === "Procesado" ? 1 : 0,
      id_empresa: idEmpresa,
      imagenFile: imagen instanceof File ? imagen : null,
    };

    //console.log(imagen)

    try {
      setCargando(true);

      if (!id_producto) {
        // Crear nuevo producto
        await crearProducto(productoActualizado);
        setMostrarCampos(false);
      } else {
        // Actualizar producto existente
        await actualizarProducto(id_producto, productoActualizado);
        setMensaje({
          tipo: "success",
          texto: "La información se ha guardado correctamente.",
        });
      }

      setGuardar(false);
    } catch (error) {
      setMostrarCampos(true);
      console.log("mostrarCampos", mostrarCampos);
      setMensaje({
        tipo: "error",
        texto:
          "Error al crear el producto. Evite utilizar caracteres especiales. (< > ' \" ; ` % \\)",
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
                <label className="block mb-1 font-medium">Nombre:</label>
                <input
                  // required
                  value={nombre}
                  onChange={handleInputChange(setNombre)}
                  className="w-full border rounded px-3 py-2"
                  type="text"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Categoría(s):</label>
                <select
                  // required
                  value={categoria}
                  onChange={handleInputChange(setCategoria)}
                  className="w-full border rounded px-3 py-2 cursor-pointer"
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
              <label className="block mb-1 font-medium">Descripción:</label>
              <input
                // required
                value={descripcion}
                onChange={handleInputChange(setDescripcion)}
                className="w-full border rounded px-3 py-2"
                type="text"
              />
            </div>

            {/* Campos de público objetivo y estado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium">
                  Público objetivo:
                </label>
                <input
                  // required
                  value={publico}
                  onChange={handleInputChange(setPublico)}
                  className="w-full border rounded px-3 py-2"
                  type="text"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Estado:</label>
                <select
                  // required
                  value={estado}
                  onChange={handleInputChange(setEstado)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="" disabled>
                    Seleccione
                  </option>
                  <option>Procesado</option>
                  <option>Sin Procesar</option>
                </select>
              </div>
            </div>

            {/* Selector de imagen con vista previa */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Imagen de producto:
              </label>
              {imagen ? (
                <div>
                  <label
                    htmlFor="imagen"
                    className="border-2 border-dashed border-gray-400 rounded p-6 text-center cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition"
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
                      src={imagePreview || imagen}
                      alt={`Imagen del producto ${nombre}`}
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

              {imagen && (
                <p className="text-sm text-gray-600 mt-2 italic">
                  Imagen seleccionada:{" "}
                  {typeof imagen === "string" ? imagen : imagen.name}
                </p>
              )}
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
                      Creando producto...
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
