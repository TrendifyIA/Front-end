import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Importación de react-router-dom
import "./index.css";
import PublicLayout from "./pages/layouts/PublicLayout.jsx"; // Importación de los layouts
import UsersLayout from "./pages/layouts/UsersLayout.jsx";
import SimpleLayout from "./pages/layouts/SimpleLayout.jsx";
import App from "./App.jsx";
import Landing from "./pages/LandingPage.jsx";
import Planes from "./pages/PlansPage.jsx";
import Servicios from "./pages/Servicios.jsx";
import Nosotros from "./pages/AboutUsPage.jsx";
import Dashboard from "./pages/users/Dashboard.jsx";
//import RecuperarPassword from "./pages/RecuperarPassword.jsx";
//import RestablecerPassword from "./pages/RestablecerPassword.jsx";
//import Perfil from "./pages/users/Perfil.jsx";
import Registro from "./pages/RegistroUsuario.jsx";
import Login from "./pages/Login.jsx";

import Producto from "./pages/users/Producto.jsx";
import Campana from "./pages/users/Campana.jsx";

const router = createBrowserRouter([
  // Arreglo que continene las rutas de la app
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Landing /> }, // Ruta por defecto
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
      { path: "producto", element: <Producto /> }, 
      { path: "campana", element: <Campana /> }, 
    ],
  },
  {
    path: "/simple",
    element: <SimpleLayout />,
    children: [
      { path: "registro", element: <Registro /> }, // Ruta por defecto
      { path: "login", element: <Login /> },
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
