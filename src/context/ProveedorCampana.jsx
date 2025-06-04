/**
 * @file ProveedorCampana.jsx
 * @author Jennyfer Jasso
 * @description Contexto y proveedor para el manejo de la información de la campaña.
 */

import { createContext, useCallback, useState } from "react";

// Contexto global
export const ContextoCampana = createContext();

/**
 * Componente proveedor que permite acceder y actualizar la información de una campaña
 * asociada a un producto.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos que consumirán el contexto.
 * @returns {JSX.Element} Proveedor del contexto de campaña.
 */
const ProveedorCampana = ({ children }) => {
  // Estado para almacenar la campaña actual
  const [campana, setCampana] = useState(null);

  /**
   * Función para obtener los datos de la campaña relacionada a un producto específico.
   *
   * @param {number} idProducto - ID del producto asociado a la campaña.
   * @returns {Promise<Object|null>} - Retorna los datos de la campaña si existe, o null si no hay campaña.
   */
  const obtenerDatosCampana = useCallback(async (idProducto) => {
    const res = await fetch(
      `http://127.0.0.1:8080/campana/campanas/${idProducto}`
    );
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      setCampana(data[data.length - 1]);
      return data[data.length - 1];
    }
    setCampana(null);
    return null;
  }, []);

  return (
    <ContextoCampana.Provider value={{ campana, obtenerDatosCampana }}>
      {children}
    </ContextoCampana.Provider>
  );
};

export default ProveedorCampana;
