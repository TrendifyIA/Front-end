/**
 * @file SimpleLayout.jsx
 * @author Yael Pérez
 * @description Layout que permite visualizar solo el logo de Trendify
 */

import SimpleNav from "../../components/SimpleNav"
import { Outlet } from "react-router-dom"

const SimpleLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <SimpleNav></SimpleNav>
      <main className="pt-16 h-full overflow-y-auto">
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default SimpleLayout
