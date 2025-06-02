/**
 * @file ProveedorProducto.jsx
 * @author Jennyfer Jasso
 * @description Contexto y proveedor para el manejo de la información de la empresa.
 */
import { createContext, useCallback, useState } from "react";

// Contexto global para el producto
export const ContextoProducto = createContext();

/**
 * Componente proveedor que encapsula la lógica y estado para acceder y actualizar
 * la información de un producto registrado.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos que consumirán el contexto.
 * @returns {JSX.Element} Proveedor del contexto de producto.
 */
const ProveedorProducto = ({ children }) => {
  // Estado para almacenar el producto actual
  const [producto, setProducto] = useState(null);

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

  return (
    <ContextoProducto.Provider value={{ producto, obtenerDatosProducto }}>
      {children}
    </ContextoProducto.Provider>
  );
};

export default ProveedorProducto;
