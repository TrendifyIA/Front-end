/**
 * @file ProveedorTutorial.jsx
 * @author Jennyfer Jasso, Min Che Kim
 * @description Contexto y proveedor para el manejo del tutorial de empresa, producto y campaña.
 */
import { createContext, useCallback, useState } from "react";

// Contexto global
export const ContextoTutorial = createContext();

/**
 * Componente proveedor que encapsula el estado y funciones necesarias
 * para el manejo del tutorial de onboarding.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos que accederán al contexto.
 * @returns {JSX.Element} Proveedor del contexto del tutorial.
 */
const ProveedorTutorial = ({ children }) => {

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Estado de los datos del formulario de empresa
  const [empresa, setEmpresa] = useState(() => {
    const saved = localStorage.getItem("tutorial_empresa_form");
    return saved
      ? JSON.parse(saved)
      : {
          nombre: "",
          nicho: "",
          direccion: "",
          propuesta_valor: "",
          descripcion_servicio: "",
          competidores: "",
        };
  });

  // Estado de los datos del formulario de producto
  const [producto, setProducto] = useState(() => {
    const saved = localStorage.getItem("tutorial_producto_form");
    return saved
      ? JSON.parse(saved)
      : {
          nombre: "",
          categoria: "",
          descripcion: "",
          publico_objetivo: "",
          estado: "",
          ruta_img: "",
          // imagenPreview: "",
        };
  });

  // Estado de los datos del formulario de campaña
  const [campana, setCampana] = useState(() => {
    const saved = localStorage.getItem("tutorial_campana_form");
    return saved
      ? JSON.parse(saved)
      : {
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

  const [tutorialCompletado, setTutorialCompletado] = useState(null);

  /**
   * Envía los datos de empresa, producto y campaña al backend para registrarlos.
   *
   * @param {number} id_usuario - ID del usuario que realiza el registro.
   * @returns {Promise<Object>} Datos devueltos por el backend (empresa, producto, campaña).
   */
  const registrarDatos = useCallback(async () => {
    const token = getToken();

    const formData = new FormData();

    const datosEmpresa = {
      // id_usuario,
      nombre: empresa.nombre,
      nicho: empresa.nicho,
      direccion: empresa.direccion,
      descripcion_servicio: empresa.descripcion_servicio,
      propuesta_valor: empresa.propuesta_valor,
      competidores: empresa.competidores,
    };
    formData.append("datosEmpresa", JSON.stringify(datosEmpresa));

    const datosProducto = {
      nombre: producto.nombre,
      // ruta_img: producto.ruta_img,
      categoria: producto.categoria,
      descripcion: producto.descripcion,
      publico_objetivo: producto.publico_objetivo,
      estado: Number(producto.estado),
    };
    formData.append("datosProducto", JSON.stringify(datosProducto));

    if (producto.ruta_img) {
      formData.append("ruta_img", producto.ruta_img);
    }

    const datosCampana = {
      nombre: campana.nombre,
      objetivo: campana.objetivo,
      mensaje_clave: campana.mensaje_clave,
      f_inicio: campana.f_inicio,
      f_fin: campana.f_fin,
      presupuesto: Number(campana.presupuesto),
      canales_distribucion: campana.canales_distribucion,
    };
    formData.append("datosCampana", JSON.stringify(datosCampana));

    var datos = {};
    formData.forEach((value, key) => (datos[key] = value));

    console.log("JSON enviado a /tutorial/registro-completo:", datos);

    const res = await fetch(
      "http://127.0.0.1:8080/tutorial/registro-completo",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await res.json();
    if (!res.ok) {
      if (!(producto.ruta_img instanceof File)) {
        throw new Error("Elegir de nuevo la imagen del producto");
      }
      else {
        throw new Error(data.mensaje || "Error al registrar los datos");
      }
    }
    setIdEmpresa(data.empresa.id_empresa);
    setIdProducto(data.producto.id_producto);
    return data;
  }, [empresa, producto, campana, idEmpresa, idProducto]);

  /**
   * Consulta al backend si el usuario ya completó el tutorial.
   *
   * @param {number} id_usuario - ID del usuario.
   * @returns {Promise<boolean>} Estado de finalización del tutorial.
   */
  const obtenerTutorialCompletado = useCallback(async () => {
    const token = getToken();
    if (!token) {
      console.error("No hay token disponible");
      return false;
    }

    const res = await fetch(
      `http://127.0.0.1:8080/usuario/get-tutorial-completado`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("No se pudo obtener el estado del tutorial");
    }
    const data = await res.json();
    setTutorialCompletado(data.tutorial_completo);
    console.log("Estado del tutorial:", data.tutorial_completo);
    return data.tutorial_completo;
  }, []);

  /**
   * Marca el tutorial como completado para el usuario en el backend y localStorage.
   *
   * @param {number} id_usuario - ID del usuario.
   * @throws {Error} Si la actualización falla.
   */
  const tutorialCompletadoActualizar = useCallback(async () => {
    const token = getToken();
    const res = await fetch(
      `http://127.0.0.1:8080/usuario/actualizar-tutorial-completado`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tutorial_completo: true }),
      }
    );
    if (!res.ok) {
      const data = await res.json();
      throw new Error(
        data.mensaje || "No se pudo marcar el tutorial como completado"
      );
    }
    setTutorialCompletado(true);
    const id_usuario = localStorage.getItem("id_usuario");
    localStorage.setItem(`tutorial_completado_${id_usuario}`, "true");
  }, []);

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
        registrarDatos,
        tutorialCompletado,
        tutorialCompletadoActualizar,
        obtenerTutorialCompletado,
      }}
    >
      {children}
    </ContextoTutorial.Provider>
  );
};

export default ProveedorTutorial;
