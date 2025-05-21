import { Outlet } from "react-router-dom" //Permite renderizar páginas

const TutorialLayout = () => {
  return (
    <div class="flex flex-col h-screen">
      <main class="h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default TutorialLayout