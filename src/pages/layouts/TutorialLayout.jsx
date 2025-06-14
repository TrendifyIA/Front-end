/**
 * @file TutorialLayout.jsx
 * @author Jennyfer Jasso
 * @description Layout que permite visualizar la estructura principal de las páginas de tutorial.
 */
import { Outlet } from "react-router-dom"

/**
 *  Componente que representa el layout de las páginas de tutorial, en esta no se incluye la Sidebar la cual es exclusiva de las páginas de usuario.
 *
 * @returns {JSX.Element} La estructura de layout para las páginas de tutorial.
 */
const TutorialLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <main className="h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default TutorialLayout