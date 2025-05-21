/**
 * @file ProveedorTutorial.jsx
 * @author Jennyfer Jasso
 * @description Contexto y proveedor para el manejo del tutorial de empresa, producto y campaña.
 */
import { createContext, useState } from "react";

export const ContextoTutorial = createContext();

const ProveedorTutorial = ({ children }) => {
  const [empresa, setEmpresa] = useState(() => {
    const saved = localStorage.getItem("tutorial_empresa_form");
    return saved ? JSON.parse(saved) : {
      nombre: "",
      nicho: "",
      direccion: "",
      propuesta_valor: "",
      descripcion_servicio: "",
      competidores: "",
    };
  });
  const [producto, setProducto] = useState(() => {
    const saved = localStorage.getItem("tutorial_producto_form");
    return saved ? JSON.parse(saved) : {
      nombre: "",
      categoria: "",
      descripcion: "",
      publico_objetivo: "",
      estado: "",
      ruta_img: "",
      imagenPreview: "",
    };
  });
  const [campana, setCampana] = useState(() => {
    const saved = localStorage.getItem("tutorial_campana_form");
    return saved ? JSON.parse(saved) : {
      nombre: "",
      objetivo: "",
      mensaje_clave: "",
      f_inicio: "",
      f_fin: "",
      presupuesto: "",
      canales_distribucion: "",
    };
  });

  // IDs
  const [idEmpresa, setIdEmpresa] = useState(null);
  const [idProducto, setIdProducto] = useState(null);

  return (
    <ContextoTutorial.Provider
      value={{
        empresa,
        setEmpresa,
        producto,
        setProducto,
        campana,
        setCampana,
        idEmpresa,
        setIdEmpresa,
        idProducto,
        setIdProducto,
      }}
    >
      {children}
    </ContextoTutorial.Provider>
  );
};

export default ProveedorTutorial;
