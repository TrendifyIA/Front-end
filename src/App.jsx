import NavBar from './components/NavBar.jsx';
import SideBar from './components/SideBar.jsx';
import { Outlet } from 'react-router-dom'; //Permite renderizar páginas 

function App() {
  const [encuestas, setEncuestas] = useState([]);
  const [encuestaActiva, setEncuestaActiva] = useState(null);

  const agregarNuevaEncuesta = () => {
    const nuevaEncuesta = {
      id: Date.now(),
      titulo: 'Título de encuesta',
      ultimaModificacion: new Date().toLocaleDateString(),
      preguntas: [],
    };
    setEncuestaActiva(nuevaEncuesta);
  };

  const guardarEncuesta = (encuestaGuardada) => {
    setEncuestas((prev) => {
      const actualizadas = prev.filter(e => e.id !== encuestaGuardada.id);
      return [...actualizadas, encuestaGuardada];
    });
    setEncuestaActiva(null);
  };

  const editarEncuesta = (id) => {
    const encuesta = encuestas.find(e => e.id === id);
    setEncuestaActiva(encuesta);
  };

  return (
    <div class="flex flex-col h-screen">
      <SideBar></SideBar>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App;