/**
 * @file ProveedorProducto.jsx
 * @author Yael Pérez
 * @description Página de información de la empresa (muestra los datos de la empresa a la que pertenece el usuario).
 */

import { createContext, useState, useContext } from "react";

export const ProcesamientoContext = createContext();

export const ProveedorProcesado = ({children}) => {
    const [procesando, setProcesando] = useState(false);

    return(
        <ProcesamientoContext.Provider value={{procesando, setProcesando}}>
            {children}
        </ProcesamientoContext.Provider>
    )
}