import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import PublicLayout from './pages/layouts/PublicLayout.jsx';
import UsersLayout from './pages/layouts/UsersLayout.jsx';
import SimpleLayout from './pages/layouts/SimpleLayout.jsx';

import App from './App.jsx';
import Landing from './pages/LandingPage.jsx';
import Planes from './pages/PlansPage.jsx';
import Servicios from './pages/Servicios.jsx';
import Nosotros from './pages/AboutUsPage.jsx';

import Dashboard from './pages/users/Dashboard.jsx';
import ResumenTendencias9 from './pages/users/ResumenTendencias9.jsx';
import DetalleTendencia10 from './pages/users/DetalleTendencia10.jsx';

import Registro from './pages/RegistroUsuario.jsx';
import Login from './pages/Login.jsx';
// import RecuperarPassword from './pages/RecuperarPassword.jsx';
// import RestablecerPassword from './pages/RestablecerPassword.jsx';
// import Perfil from './pages/users/Perfil.jsx';

const router = createBrowserRouter([
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
    element: <UsersLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "resumen-tendencias", element: <ResumenTendencias9 /> },
      { path: "detalle-tendencia", element: <DetalleTendencia10 /> },
    ],
  },
  {
    path: "/simple",
    element: <SimpleLayout />,
    children: [
      { path: "registro", element: <Registro /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
