/**
 * @file ProveedorCampana.jsx
 * @author Min Che Kim, ...
 * @description Proveedor de contexto para las campañas. Maneja la lógica de obtención y almacenamiento de campañas por producto.
 */
import { createContext, useContext, useEffect, useState } from "react";
import { ProductoContext } from "./ProveedorProducto";

/**
 * Contexto para compartir datos y funciones relacionadas con campañas
 */
export const CampanaContext = createContext();

/**
 * Proveedor de contexto que gestiona el estado y operaciones CRUD para las campañas
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que consumirán el contexto
 * @returns {JSX.Element} Provider de contexto con el valor actual
 */
const ProveedorCampana = ({ children }) => {
  const [todasLasCampanas, setTodasLasCampanas] = useState([]);
  const [campanasPorProducto, setCampanasPorProducto] = useState({});
  const { productos } = useContext(ProductoContext);

  
  /**
   * Efecto que carga las campañas cuando cambia el listado de productos
   * Realiza peticiones paralelas para obtener las campañas de cada producto
   */
  useEffect(() => {
    if (!productos || productos.length === 0) return;

    // Crear un array de promesas, una por cada producto
    const promesas = productos.map((producto) =>
      fetch(`http://127.0.0.1:8080/campana/campanas/${producto.id_producto}`)
        .then((response) => response.json())
        .then((data) => ({ id_producto: producto.id_producto, campanas: data }))
    );

    // Ejecutar todas las promesas en paralelo
    Promise.all(promesas)
      .then((resultados) => {
        // Crear un objeto que mapea id_producto a sus campañas
        const nuevasCampanasPorProducto = {};
        let todasCampanas = [];

        resultados.forEach(({ id_producto, campanas }) => {
          nuevasCampanasPorProducto[id_producto] = campanas;
          todasCampanas = [...todasCampanas, ...campanas];
        });

        setCampanasPorProducto(nuevasCampanasPorProducto);
        setTodasLasCampanas(todasCampanas);
      })
      .catch((error) => console.error("Error fetching campañas:", error));
  }, [productos]);

  /**
   * Crea una nueva campaña en el sistema y actualiza el estado local
   * 
   * @async
   * @param {Object} data - Datos de la campaña a crear
   * @param {number} data.id_producto - ID del producto asociado a la campaña
   * @throws {Error} Si la petición falla o los datos contienen caracteres no permitidos
   * @returns {Promise<void>}
   */
  const crearCampana = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8080/campana/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Campaña creada:", responseData);
      if (!responseData)
        throw new Error(responseData.mensaje || "Error al crear campaña");

      // Actualizar el estado de campanas
      const campanasResponse = await fetch(
        `http://127.0.0.1:8080/campana/campanas/${data.id_producto}`
      );
      const campanasData = await campanasResponse.json();

      setCampanasPorProducto((prevCampanas) => ({
        ...prevCampanas,
        [data.id_producto]: campanasData,
      }));
    } catch (error) {
      console.error("Evite utilizar caracteres especiales. (<  >  \'  \"  ;  `  %  \\)");
      throw error;
    }
  };

  /**
   * Actualiza una campaña existente y refresca los datos en el estado local
   * 
   * @async
   * @param {number} id_campana - ID de la campaña a actualizar
   * @param {Object} data - Datos actualizados de la campaña
   * @param {number} data.id_producto - ID del producto asociado a la campaña
   * @throws {Error} Si la actualización falla
   * @returns {Promise<void>}
   */
  const actualizarCampana = async (id_campana, data) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/campana/actualizar-campana/${id_campana}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.mensaje || `Error: ${response.status}`);
      }

      // Actualizar el estado de campanas
      const campanasResponse = await fetch(
        `http://127.0.0.1:8080/campana/campana/${id_campana}`
      );
      const campanasActualizado = await campanasResponse.json();
      setTodasLasCampanas((prevCampanas) =>
        prevCampanas.map((campana) =>
          campana.id_campana === id_campana ? campanasActualizado : campana
        )
      );

      // Actualiza el listado específico para el producto
      setCampanasPorProducto((prevCampanas) => ({
          ...prevCampanas,
          [data.id_producto]: prevCampanas[data.id_producto].map((campana) =>
          campana.id_campana == id_campana ? campanasActualizado : campana
        )
      }));
    } catch (err) {
      console.error("Error actualizando campaña:", err.message);
      throw err;
    }
  };

  const value = {
    campanas: todasLasCampanas,
    campanasPorProducto,
    getCampanasPorProducto: (productoId) => {
      return campanasPorProducto[productoId] || [];
    },
    crearCampana,
    actualizarCampana,
  };

  return (
    <CampanaContext.Provider value={value}>{children}</CampanaContext.Provider>
  );
};

export default ProveedorCampana;
