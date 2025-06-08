/**
 * @file ProveedorProducto.jsx
 * @author Min Che Kim, Jennyfer Jasso
 * @description Página de información de la empresa (muestra los datos de la empresa a la que pertenece el usuario).
 */
import { createContext, useState, useEffect, useContext, useCallback } from "react";

import { UsuarioContext } from "./ProveedorUsuario";

/**
 * Contexto para compartir datos y funciones relacionadas con productos
 */
export const ContextoProducto = createContext();

/**
 * Proveedor de contexto que gestiona el estado y operaciones CRUD para los productos
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que consumirán el contexto
 * @returns {JSX.Element} Provider de contexto con el valor actual
 */
const ProveedorProducto = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState(null);

  const [cargandoProductos, setCargandoProductos] = useState(true);
  const { idEmpresa } = useContext(UsuarioContext);
  // console.log("idempresa", idEmpresa);

  
  /**
   * Función para obtener los datos de un producto por su ID.
   *
   * @param {number} idProducto - ID del producto a consultar.
   * @returns {Promise<Object|null>} Retorna los datos del producto si existe, o null si no se encuentra.
   */
  const obtenerDatosProducto = useCallback(async (idProducto) => {
    const res = await fetch(`http://127.0.0.1:8080/producto/${idProducto}`);
    const data = await res.json();
    setProducto(data);
    return data;
  }, []);

  /**
   * Efecto que carga los productos cuando se obtiene el ID de la empresa
   * Obtiene todos los productos asociados a la empresa del usuario actual
   */
  useEffect(() => {
    if (idEmpresa) {
      setCargandoProductos(true);
      fetch(`http://127.0.0.1:8080/producto/productos/${idEmpresa}`)
        .then((response) => response.json())
        .then((data) => {
          setProductos(data);
          // console.log("Productos fetched:", data);
          setCargandoProductos(false);
        })

        .catch((error) => {
          console.error("Error fetching productos:", error);
          setCargandoProductos(false);
        });
    }
  }, [idEmpresa]);

  /**
   * Crea un nuevo producto en el sistema y actualiza el estado local
   *
   * @async
   * @param {Object} data - Datos del producto a crear
   * @param {string} data.nombre - Nombre del producto
   * @param {string} data.categoria - Categoría del producto
   * @param {string} data.descripcion - Descripción detallada del producto
   * @param {string} data.publico_objetivo - Público objetivo del producto
   * @param {string} data.estado - Estado del producto (activo, inactivo, etc.)
   * @param {File} [data.imagenFile] - Archivo de imagen del producto (opcional)
   * @throws {Error} Si la petición falla o los datos contienen caracteres no permitidos
   * @returns {Promise<void>}
   */
  const crearProducto = async (data) => {
    try {
      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("categoria", data.categoria);
      formData.append("descripcion", data.descripcion);
      formData.append("publico_objetivo", data.publico_objetivo);
      formData.append("estado", data.estado);
      formData.append("id_empresa", idEmpresa);

      // Adjuntar el archivo si está disponible
      if (data.imagenFile) {
        formData.append("ruta_img", data.imagenFile);
      }

      // console.log("Form data/producto/crear:", formData);

      const resProducto = await fetch("http://127.0.0.1:8080/producto/crear", {
        method: "POST",
        body: formData,
      });

      const dataProducto = await resProducto.json();
      if (!resProducto.ok)
        throw new Error(dataProducto.mensaje || "Error al crear producto");

      // Actualizar el estado de productos
      if (idEmpresa) {
        const productosResponse = await fetch(
          `http://127.0.0.1:8080/producto/productos/${idEmpresa}`
        );
        const productosData = await productosResponse.json();
        setProductos(productosData);
      }
    } catch (error) {
      console.error(
        error.message,
        "Evite utilizar caracteres especiales. (<  >  '  \"  ;  `  %  \\)"
      );
      throw error;
    }
  };

  /**
   * Actualiza un producto existente y refresca los datos en el estado local
   *
   * @async
   * @param {number} id_producto - ID del producto a actualizar
   * @param {Object} data - Datos actualizados del producto
   * @param {string} [data.nombre] - Nombre actualizado del producto
   * @param {string} [data.categoria] - Categoría actualizada del producto
   * @param {string} [data.descripcion] - Descripción actualizada del producto
   * @param {string} [data.publico_objetivo] - Público objetivo actualizado
   * @param {string} [data.estado] - Estado actualizado del producto
   * @throws {Error} Si la actualización falla
   * @returns {Promise<void>}
   */
  const actualizarProducto = async (id_producto, data) => {
    try {
      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("categoria", data.categoria);
      formData.append("descripcion", data.descripcion);
      formData.append("publico_objetivo", data.publico_objetivo);
      formData.append("estado", data.estado);
      formData.append("id_empresa", idEmpresa);

      // Adjuntar el archivo si está disponible
      if (data.imagenFile) {
        formData.append("ruta_img", data.imagenFile);
      }

      const response = await fetch(
        `http://127.0.0.1:8080/producto/actualizar-producto/${id_producto}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.mensaje || `Error: ${response.status}`);
      }

      const productosResponse = await fetch(
        `http://127.0.0.1:8080/producto/${id_producto}`
      );
      const productosActualizado = await productosResponse.json();
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.id_producto === id_producto ? productosActualizado : producto
        )
      );
    } catch (err) {
      console.error("Error actualizando producto:", err.message);
    }
  };

  const value = {
    productos,
    crearProducto,
    actualizarProducto,
    producto, 
    obtenerDatosProducto,
    cargandoProductos
  };

  return (
    <ContextoProducto.Provider value={value}>
      {children}
    </ContextoProducto.Provider>
  );
};

export default ProveedorProducto;
