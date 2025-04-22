import NavBar from './components/NavBar.jsx';
import SideBar from './components/SideBar.jsx';
import { Outlet } from 'react-router-dom'; //Permite renderizar páginas 

function App() {

  return (
    <div class="flex flex-col h-screen">
      <SideBar></SideBar>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
