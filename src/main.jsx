import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom' // Importación de react-router-dom
import './index.css'
import PublicLayout from './pages/layouts/PublicLayout.jsx' // Importación de los layouts
import UsersLayout from './pages/layouts/UsersLayout.jsx'
import App from './App.jsx'
import ResumenTendencias9 from './pages/users/ResumenTendencias9.jsx'
import DetalleTendencia10 from './pages/users/DetalleTendencia10.jsx'
import SimpleLayout from "./pages/layouts/SimpleLayout.jsx";
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
import Producto from "./pages/users/Producto.jsx";
import Campana from "./pages/users/Campana.jsx";
import Empresa from "./pages/users/Empresa.jsx";
import Bienvenida from "./pages/users/Bienvenida.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx"; // Importación del componente de ruta privada
import SubscribedRoute from "./components/SubscribedRoute.jsx";
import ProductsPage from "./pages/users/ProductsPage.jsx";
import SummaryPage from "./pages/users/SummaryPage.jsx";

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
    element: (
      <SubscribedRoute>
        <UsersLayout />
      </SubscribedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "producto", element: <Producto /> },
      { path: "campana", element: <Campana /> },
      { path: "empresa", element: <Empresa /> },
      { path: "bienvenida", element: <Bienvenida /> },
      { path: 'resumen-tendencias', element: <ResumenTendencias9 /> },
      {path: 'detalle-tendencia', element: <DetalleTendencia10 /> },
      { path: "adminproductos", element: <ProductsPage /> }, // Ruta para la página de productos
      { path: "resumen", element: <SummaryPage /> }, // Ruta para la página de resumen
      {},
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
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
