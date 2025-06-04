/**
 * @file ProveedorEmpresa.jsx
 * @author Jennyfer Jasso
 * @description Contexto y proveedor para el manejo de la información de la empresa.
 */
import { createContext, useCallback, useState } from "react";

// Contexto global para la empresa
export const ContextoEmpresa = createContext();

/**
 * Componente proveedor que encapsula la lógica y el estado para acceder y actualizar
 * la información de una empresa registrada.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos que consumirán el contexto.
 * @returns {JSX.Element} Proveedor del contexto de empresa.
 */
const ProveedorEmpresa = ({ children }) => {
  // Estado para almacenar la empresa actual
  const [empresa, setEmpresa] = useState(null);

  /**
   * Función para obtener los datos de una empresa específica.
   *
   * @param {number} idEmpresa - ID de la empresa a consultar.
   * @returns {Promise<Object|null>} - Retorna los datos de la empresa si existe, o null si no se encuentra.
   */
  const obtenerDatosEmpresa = useCallback(async (idEmpresa) => {
    const res = await fetch(`http://127.0.0.1:8080/empresa/${idEmpresa}`);
    const data = await res.json();
    console.log("Datos de empresa:", data);
    setEmpresa(data);
    return data;
  }, []);

  return (
    <ContextoEmpresa.Provider value={{ empresa, obtenerDatosEmpresa }}>
      {children}
    </ContextoEmpresa.Provider>
  );
};

export default ProveedorEmpresa;
