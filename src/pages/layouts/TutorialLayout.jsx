import { Outlet } from "react-router-dom" //Permite renderizar páginas

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