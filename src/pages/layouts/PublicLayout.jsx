/**
 * @file PublicLayout.jsx
 * @author Yael Pérez
 * @description Layout que permite visualizar a los usuarios no registrados la navbar
 */

import NavBar from "../../components/NavBar"
import { Outlet } from "react-router-dom" //Permite renderizar páginas

/**
 * Renderiza una barra de navegación en la parte superior y muestra el contenido de las rutas anidadas debajo.
 *
 * @returns {JSX.Element} El layout con NavBar y un Outlet para las rutas hijas.
 */
const PublicLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar></NavBar>
      <main className="pt-16 h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default PublicLayout