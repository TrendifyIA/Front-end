/**
 * @file TutorialRoute.jsx
 * @author Jennyfer Jasso, ...
 * @description Ruta protegida que redirige si el tutorial ya fue completado.
 */
import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ContextoTutorial } from "../context/ProveedorTutorial";
import { ContextoEmpresa } from "../context/ProveedorEmpresa";

/**
 * Componente que solo permite el acceso al flujo del tutorial si el usuario no lo ha completado.
 * Si el usuario ya lo completó, se redirige automáticamente a /users/adminproductos.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elementos hijos que se mostrarán si el acceso está permitido.
 * @returns {JSX.Element} Elementos hijos o redirección.
 */
const TutorialRoute = ({ children }) => {
  const { tutorialCompletado, obtenerTutorialCompletado } =
    useContext(ContextoTutorial);
  const { empresaRegistrada, isEmpresaRegistrada } = useContext(ContextoEmpresa);
  const id_usuario = localStorage.getItem("id_usuario");

  // Verifica si el usuario ya completo el tutorial
  useEffect(() => {
    if (id_usuario) {
      isEmpresaRegistrada(id_usuario);
      obtenerTutorialCompletado(id_usuario);
    }
  }, [id_usuario, obtenerTutorialCompletado, isEmpresaRegistrada]);

  if (tutorialCompletado === null || empresaRegistrada === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-500 font-sans">
        <div className="text-white text-xl">Verificando acceso...</div>
      </div>
    );
  }

  if (tutorialCompletado || empresaRegistrada) {
    return <Navigate to="/users/adminproductos" />;
  }

  return children;
};

export default TutorialRoute;
