import NavBar from "../../components/NavBar"
import { Outlet } from "react-router-dom" //Permite renderizar páginas

const PublicLayout = () => {
  return (
    <div class="flex flex-col h-screen">
      <NavBar></NavBar>
      <main class="pt-18 h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default PublicLayout