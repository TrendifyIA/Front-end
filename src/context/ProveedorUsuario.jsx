/**
 * @file ProveedorUsuario.jsx
 * @author Min Che Kim
 * @description Proveedor de contexto para gestionar la información del usuario actual.
 *              Se encarga de obtener el ID de la empresa asociada al usuario autenticado.
 */
import { createContext, useEffect, useState } from "react"

/**
 * Contexto para compartir la información del usuario a través de la aplicación
 */
export const UsuarioContext = createContext();

/**
 * Proveedor de contexto que gestiona la información del usuario actual
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que consumirán el contexto
 * @returns {JSX.Element} Provider de contexto con el valor actual
 */
const ProveedorUsuario = ({ children }) => {
    const [idEmpresa, setIdEmpresa] = useState(null);
    const [nombreEmpresa, setNombreEmpresa] = useState("");

    /**
     * Efecto que obtiene el ID de empresa asociada al usuario autenticado
     * Consulta el ID de usuario almacenado en localStorage y luego obtiene
     * la información de la empresa asociada mediante una petición API
     */
    useEffect(() => {
        const id_usuario = localStorage.getItem("id_usuario");

        // console.log("ID de usuario desde localStorage:", id_usuario);

        if (!id_usuario) {
            console.error("No se encontró ID de usuario en localStorage");
            return;
        }

        fetch(`http://127.0.0.1:8080/empresa/empresa/${id_usuario}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los datos del usuario");
            }
            return response.json();
        })
        .then((data) => {
            setIdEmpresa(data.id_empresa);
            setNombreEmpresa(data.nombre);
            //console.log("Datos del usuario obtenidos:", data.id_empresa);
        })
        .catch(error => console.error("Error fetching usuario:", error));
    }, []);

    const value = { idEmpresa, nombreEmpresa };
    

    return (
        <UsuarioContext.Provider value={value}>
            {children}
        </UsuarioContext.Provider>
    );
}

export default ProveedorUsuario;