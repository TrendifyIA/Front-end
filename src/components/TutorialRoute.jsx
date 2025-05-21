/**
 * @file TutorialRoute.jsx
 * @author Jennyfer Jasso, ...
 * @description Ruta protegida que redirige si el tutorial ya fue completado.
 */
import { Navigate } from "react-router-dom";

const TutorialRoute = ({ children }) => {
  const id_usuario = localStorage.getItem("id_usuario");
  const tutorialCompletado =
    localStorage.getItem(`tutorial_completado_${id_usuario}`) === "true";
  return tutorialCompletado ? (
    <Navigate to="/users/adminproductos" />
  ) : (
    children
  );
};

export default TutorialRoute;
