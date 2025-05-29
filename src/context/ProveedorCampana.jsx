/**
 * @file ProveedorCampana.jsx
 * @author Min Che Kim, ...
 * @description Proveedor de contexto para las campañas. Maneja la lógica de obtención y almacenamiento de campañas por producto.
 */
import { createContext, useContext, useEffect, useState } from "react";
import { ProductoContext } from "./ProveedorProducto";

export const CampanaContext = createContext();

const ProveedorCampana = ({ children }) => {
  const [todasLasCampanas, setTodasLasCampanas] = useState([]);
  const [campanasPorProducto, setCampanasPorProducto] = useState({});
  const { productos } = useContext(ProductoContext);

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

  const value = {
    campanas: todasLasCampanas,
    campanasPorProducto,
    getCampanasPorProducto: (productoId) => {
      return campanasPorProducto[productoId] || [];
    },
  };

  return (
    <CampanaContext.Provider value={value}>{children}</CampanaContext.Provider>
  );
};

export default ProveedorCampana;
