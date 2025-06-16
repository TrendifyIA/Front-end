/**
 * @file main.jsx
 * @author Andrea Doce, Alexei Martínez, Eduardo Rosas, Jennyfer Jasso, Sandra Hernández, Min Che Kim, Yael Pérez
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
import Landing from "./pages/LandingPage.jsx";
import Planes from "./pages/PlansPage.jsx";
import PlanesProtected from "./pages/PlansPageProtected.jsx";
import Servicios from "./pages/Servicios.jsx";
import Nosotros from "./pages/AboutUsPage.jsx";
//import Dashboard from "./pages/users/Dashboard.jsx";
import Registro from "./pages/RegistroUsuario.jsx";
import Login from "./pages/Login.jsx";
import ProductsPage from "./pages/users/ProductsPage.jsx";
import SummaryPage from "./pages/tutorial/SummaryPage.jsx";
import ConfirmacionDatos from "./pages/tutorial/ConfirmarDatos.jsx";
import Producto from "./pages/tutorial/Producto.jsx";
import Campana from "./pages/tutorial/Campana.jsx";
import TutorialEmpresa from "./pages/tutorial/Empresa.jsx";
import Bienvenida from "./pages/tutorial/Bienvenida.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import SubscribedRoute from "./components/SubscribedRoute.jsx";
import Empresa from "./pages/users/Empresa.jsx";
import ProveedorTutorial from "./context/ProveedorTutorial";
import ResumenTendencias9 from "./pages/users/ResumenTendencias9.jsx";
import DetalleTendencia10 from "./pages/users/DetalleTendencia10.jsx";
import TutorialRoute from "./components/TutorialRoute.jsx";
import ProveedorEmpresa from "./context/ProveedorEmpresa";
import ProveedorProducto from "./context/ProveedorProducto";
import ProveedorCampana from "./context/ProveedorCampana";
import ProveedorModal from "./context/ProveedorModal.jsx";
import { ProveedorProcesado } from "./context/ProveedorProcesado.jsx";
// import ConfirmacionModal from "./components/ConfirmacionModal.jsx";

const router = createBrowserRouter([
  // Arreglo que continene las rutas de la app
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "suscripcion", element: <Planes /> },
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
      { path: "producto", element: <Producto /> },
      { path: "campana", element: <Campana /> },
      {
        path: "adminproductos",
        element: (
          <ProveedorEmpresa>
            <ProveedorProducto>
              <ProveedorCampana>
                <ProveedorModal>
                  <ProveedorProcesado>
                    <ProductsPage />
                  </ProveedorProcesado>
                </ProveedorModal>
              </ProveedorCampana>
            </ProveedorProducto>
          </ProveedorEmpresa>
        ),
      },
      {
        path: "empresa",
        element: (
          <ProveedorEmpresa>
            <Empresa />
          </ProveedorEmpresa>
        ),
      },
      { path: "resumen-tendencias", element: <ResumenTendencias9 /> },
      { path: "detalle-tendencia", element: <DetalleTendencia10 /> },
      { path: "resumen", element: <SummaryPage /> },
    ],
  },
  {
    path: "/simple",
    element: <SimpleLayout />,
    children: [
      { path: "registro", element: <Registro /> },
      {
        path: "login",
        element: (
          <ProveedorTutorial>
            <ProveedorEmpresa>
              <Login />
            </ProveedorEmpresa>
          </ProveedorTutorial>
        ),
      },
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
      <ProveedorTutorial>
        <ProveedorEmpresa>
          <ProveedorProducto>
            <ProveedorCampana>
              <TutorialRoute>
                <TutorialLayout />
              </TutorialRoute>
            </ProveedorCampana>
          </ProveedorProducto>
        </ProveedorEmpresa>
      </ProveedorTutorial>
    ),
    children: [
      { index: true, element: <Bienvenida /> },
      { path: "producto", element: <Producto /> },
      { path: "campana", element: <Campana /> },
      { path: "empresa", element: <TutorialEmpresa /> },
      { path: "resumen", element: <SummaryPage /> },
      { path: "confirmacion", element: <ConfirmacionDatos /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
