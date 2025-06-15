/**
 * @file UsersLayout.jsx
 * @author Yael Pérez
 * @description Layout que permite visualizar la sidebar para los usuarios que inican sesión
 */

import SideBar from "../../components/SideBar"
import { Outlet } from "react-router-dom";

const UsersLayout = () => {
  return (
    <div className="flex h-screen">
        <SideBar></SideBar>
        <main className="flex-1 bg-neutral-100 overflow-y-auto ml-[280px]">
            <Outlet></Outlet>
        </main>
    </div>
  )
}

export default UsersLayout
