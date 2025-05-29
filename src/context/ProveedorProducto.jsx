/**
 * @file Empresa.jsx
 * @author Min Che Kim
 * @description Página de información de la empresa (muestra los datos de la empresa a la que pertenece el usuario).
 */
import { createContext, useState, useEffect } from "react";

import sabritaslimon from "../assets/images/sabritaslimon.png";
import sabritasadobadas from "../assets/images/sabritasadobadas.png";
import sabritashabanero from "../assets/images/sabritashabanero.png";

export const ProductoContext = createContext();

const ProveedorProducto = ({ children }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // TODO: Obtener idEmpresa de manera automática según el usuario autenticado
    const idEmpresa = 4; // Cambia esto por el ID dinámico si es necesario
    fetch(`http://127.0.0.1:8080/producto/productos/${idEmpresa}`)
      .then((response) => response.json())
      .then((data) => { 
        setProductos(data)
        // console.log("Productos fetched:", data);
      })
      .catch((error) => console.error("Error fetching productos:", error));
  }, [productos]);

  const value = {
    productos
  };
  return (
    <ProductoContext.Provider value={value}>
      {children}
    </ProductoContext.Provider>
  );
};

export default ProveedorProducto;