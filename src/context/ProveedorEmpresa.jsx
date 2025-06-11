/**
 * @file ProveedorEmpresa.jsx
 * @author Jennyfer Jasso
 * @description Contexto y proveedor para el manejo de la información de la empresa.
 */
import { createContext, useCallback, useState } from "react";

// Contexto global para la información de la empresa
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
  const [empresaRegistrada, setEmpresaRegistrada] = useState(false);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  /**
   * Obtiene los datos de una empresa por su ID..
   *
   * @param {number} idEmpresa - ID de la empresa a consultar.
   * @returns {Promise<Object|null>} - Retorna los datos de la empresa si existe, o null si no se encuentra.
   */
  const obtenerDatosEmpresa = useCallback(async () => {
    const token = getToken();

    const res = await fetch(`http://127.0.0.1:8080/empresa`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const res = await fetch(`http://127.0.0.1:8080/empresa/${idEmpresa}`);
    const data = await res.json();
    console.log("Datos de empresa:", data);
    setEmpresa(data);
    return data;
  }, []);

  /**
   * Verifica si un usuario ya tiene registrada una empresa.
   *
   * @param {number|string} id_usuario - ID del usuario a validar.
   * @returns {Promise<boolean>} True si existe, false si no.
   */
  const isEmpresaRegistrada = useCallback(async () => {
    const token = getToken();
    
    try {
      const res = await fetch(`http://127.0.0.1:8080/empresa`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        return false;
      }
      const data = await res.json();
      const existe = !!data && !!data.nombre;
      setEmpresaRegistrada(existe);
      return existe;
    } catch (error) {
      setEmpresaRegistrada(false);
      return false;
    }
  }, []);

  /**
   * Modifica los datos de una empresa ya registrada.
   *
   * @param {number|string} id_empresa - ID de la empresa a modificar.
   * @param {Object} datosActualizados - Objeto con los campos a actualizar.
   * @returns {Promise<boolean>} True si la modificación fue exitosa, false si hubo error.
   */
  const modificarEmpresa = useCallback(
    async (datosActualizados) => {
      const token = getToken();

      try {
        const res = await fetch(
          `http://127.0.0.1:8080/empresa/modificar-empresa`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(datosActualizados),
          }
        );
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Error al modificar la empresa");
        }

        setEmpresa((prev) => ({ ...prev, ...datosActualizados }));
        return true;
      } catch (error) {
        console.error("Error al modificar la empresa:", error);
        return false;
      }
    }
  );

  return (
    <ContextoEmpresa.Provider
      value={{
        empresa,
        obtenerDatosEmpresa,
        empresaRegistrada,
        isEmpresaRegistrada,
        modificarEmpresa
      }}
    >
      {children}
    </ContextoEmpresa.Provider>
  );
};

export default ProveedorEmpresa;
