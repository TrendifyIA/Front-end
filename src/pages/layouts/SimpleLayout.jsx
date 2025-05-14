import SimpleNav from "../../components/SimpleNav"
import { Outlet } from "react-router-dom"

const SimpleLayout = () => {
  return (
    <div class="flex flex-col h-screen">
      <SimpleNav></SimpleNav>
      <main class="pt-16 h-full overflow-y-auto">
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default SimpleLayout
