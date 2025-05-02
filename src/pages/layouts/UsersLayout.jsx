import SideBar from "../../components/SideBar"
import { Outlet } from "react-router-dom";

const UsersLayout = () => {
  return (
    <div class="flex h-screen">
        <SideBar></SideBar>
        <main class="flex-1 bg-neutral-100 overflow-y-auto">
            <Outlet></Outlet>
        </main>
    </div>
  )
}

export default UsersLayout
