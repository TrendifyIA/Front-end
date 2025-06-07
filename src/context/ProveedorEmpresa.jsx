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

  /**
   * Obtiene los datos de una empresa por su ID..
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

  /**
   * Obtiene los datos de una empresa de un usuario en específico.
   *
   * @param {number|string} idUsuario - ID del usuario.
   * @returns {Promise<Object>} Datos de la empresa asociada al usuario.
   * @throws {Error} Si la empresa no fue encontrada.
   */
  const obtenerDatosEmpresaUsuario = useCallback(async (idUsuario) => {
    const res = await fetch(
      `http://127.0.0.1:8080/empresa/empresa/${idUsuario}`
    );
    if (!res.ok) {
      throw new Error("Empresa no encontrada");
    }
    const data = await res.json();
    setEmpresa(data);
    return data;
  }, []);

  /**
   * Verifica si un usuario ya tiene registrada una empresa.
   *
   * @param {number|string} id_usuario - ID del usuario a validar.
   * @returns {Promise<boolean>} True si existe, false si no.
   */
  const isEmpresaRegistrada = useCallback(async (id_usuario) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8080/empresa/empresa/${id_usuario}`
      );
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
    async (id_empresa, datosActualizados) => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8080/empresa/modificar-empresa/${id_empresa}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
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
        modificarEmpresa,
        obtenerDatosEmpresaUsuario,
      }}
    >
      {children}
    </ContextoEmpresa.Provider>
  );
};

export default ProveedorEmpresa;
