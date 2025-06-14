/**
 * @file ProveedorProducto.jsx
 * @author Yael Pérez
 * @description Página de información de la empresa (muestra los datos de la empresa a la que pertenece el usuario).
 */

import { createContext, useState } from "react";

export const ProcesamientoContext = createContext();

/**
 * Proporciona el valor del estado `procesando` y la función `setProcesando` a los componentes hijos
 * a través del contexto `ProcesamientoContext`.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element} Un proveedor de contexto que envuelve a los hijos.
 */
export const ProveedorProcesado = ({children}) => {
    const [procesando, setProcesando] = useState(false);

    return(
        <ProcesamientoContext.Provider value={{procesando, setProcesando}}>
            {children}
        </ProcesamientoContext.Provider>
    )
}