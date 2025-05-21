/**
 * @file main.jsx
 * @author Andrea Doce, Alexei, Eduardo Rosas, Jennyfer Jasso, Sandra, ...
 * @description Punto de entrada principal para la aplicación Trendify donde se configuran las rutas y se renderiza la aplicación.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import "./index.css";
import PublicLayout from "./pages/layouts/PublicLayout.jsx"; 
import UsersLayout from "./pages/layouts/UsersLayout.jsx";
import SimpleLayout from "./pages/layouts/SimpleLayout.jsx";
import TutorialLayout from "./pages/layouts/TutorialLayout.jsx";
import App from "./App.jsx";
import Landing from "./pages/LandingPage.jsx";
import Planes from "./pages/PlansPage.jsx";
import PlanesProtected from "./pages/PlansPageProtected.jsx";
import Servicios from "./pages/Servicios.jsx";
import Nosotros from "./pages/AboutUsPage.jsx";
import Dashboard from "./pages/users/Dashboard.jsx";
//import RecuperarPassword from "./pages/RecuperarPassword.jsx";
//import RestablecerPassword from "./pages/RestablecerPassword.jsx";
//import Perfil from "./pages/users/Perfil.jsx";
import Registro from "./pages/RegistroUsuario.jsx";
import Login from "./pages/Login.jsx";
import ProductsPage from "./pages/users/ProductsPage.jsx";
import SummaryPage from "./pages/tutorial/SummaryPage.jsx";
import ConfirmacionDatos from "./pages/tutorial/ConfirmarDatos.jsx";
import Procesando from "./pages/tutorial/Procesando.jsx";
import Producto from "./pages/tutorial/Producto.jsx";
import Campana from "./pages/tutorial/Campana.jsx";
import TutorialEmpresa from "./pages/tutorial/Empresa.jsx"; 
import Bienvenida from "./pages/tutorial/Bienvenida.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx"; 
import SubscribedRoute from "./components/SubscribedRoute.jsx";
import Empresa from "./pages/users/Empresa.jsx";
import ProveedorTutorial from "./context/ProveedorTutorial";
import TutorialRoute from "./components/TutorialRoute.jsx"; 

const router = createBrowserRouter([
  // Arreglo que continene las rutas de la app
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Landing /> }, 
      { path: "planes", element: <Planes /> }, 
      { path: "servicios", element: <Servicios /> }, 
      { path: "nosotros", element: <Nosotros /> }, 
    ],
  },
  {
    path: "/users",
    element: (
      <SubscribedRoute>
        <UsersLayout />
      </SubscribedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> }, 
      { path: "adminproductos", element: <ProductsPage /> },
      { path: "empresa", element: <Empresa /> },
    ],
  },
  {
    path: "/simple",
    element: <SimpleLayout />,
    children: [
      { path: "registro", element: <Registro /> },
      { path: "login", element: <Login /> },
      {
        path: "planes_protected",
        element: (
          <PrivateRoute>
            <PlanesProtected />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/tutorial",
    element: (
      <TutorialRoute>
        <ProveedorTutorial>
          <TutorialLayout />
        </ProveedorTutorial>
      </TutorialRoute>
    ),
    children: [
      { index: true, element: <Bienvenida /> },
      { path: "producto", element: <Producto /> },
      { path: "campana", element: <Campana /> },
      { path: "empresa", element: <TutorialEmpresa /> },
      { path: "resumen", element: <SummaryPage /> },
      { path: "confirmacion", element: <ConfirmacionDatos /> },
      { path: "procesando", element: <Procesando /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
