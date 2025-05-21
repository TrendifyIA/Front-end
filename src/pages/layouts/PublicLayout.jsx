import NavBar from "../../components/NavBar"
import { Outlet } from "react-router-dom" //Permite renderizar páginas

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