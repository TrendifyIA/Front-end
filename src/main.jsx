import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Importación de react-router-dom
import "./index.css";
import PublicLayout from "./pages/layouts/PublicLayout.jsx"; // Importación de los layouts
import UsersLayout from "./pages/layouts/UsersLayout.jsx";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Planes from "./pages/Planes.jsx";
import Servicios from "./pages/Servicios.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Dashboard from "./pages/users/Dashboard.jsx";
import RecuperarPassword from "./pages/RecuperarPassword.jsx";
import RestablecerPassword from "./pages/RestablecerPassword.jsx";
import Notificaciones from "./pages/users/Notificaciones.jsx";
import Perfil from "./pages/users/Perfil.jsx";


const router = createBrowserRouter([
  // Arreglo que contiene las rutas de la app
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> }, // Ruta por defecto
      { path: "planes", element: <Planes /> }, // Ruta para la página de planes
      { path: "servicios", element: <Servicios /> }, // Ruta para la página de servicios
      { path: "nosotros", element: <Nosotros /> }, // Ruta para la página de nosotros
    ],
  },
  {
    path: "/users",
    element: <UsersLayout />,
    children: [
      { index: true, element: <Dashboard /> }, // Ruta por defecto
      { path: "perfil", element: <Perfil /> }, // Ruta para la página de perfil
      { path: "notificaciones", element: <Notificaciones /> }, // Ruta para la página de notificaciones
    ],
  },
  {
    path: "/recuperar-password",
    element: <RestablecerPassword />, // Ruta para la página de recuperar contraseña
  },
  {
    path: "/reset-password",
    element: <RecuperarPassword />, // Ruta para la página de restablecer contraseña
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);