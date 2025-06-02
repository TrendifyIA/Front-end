/**
 * @file TutorialRoute.jsx
 * @author Jennyfer Jasso, ...
 * @description Ruta protegida que redirige si el tutorial ya fue completado.
 */
import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ContextoTutorial } from "../context/ProveedorTutorial";

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
  const id_usuario = localStorage.getItem("id_usuario");

  // Verifica si el usuario ya completo el tutorial
  useEffect(() => {
    if (id_usuario) {
      obtenerTutorialCompletado(id_usuario);
    }
  }, [id_usuario, obtenerTutorialCompletado]);

  if (tutorialCompletado === null) {
    return <div>Cargando...</div>;
  }

  return tutorialCompletado ? (
    <Navigate to="/users/adminproductos" />
  ) : (
    children
  );
};

export default TutorialRoute;
